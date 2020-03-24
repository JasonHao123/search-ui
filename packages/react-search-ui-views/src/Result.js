import PropTypes from "prop-types";
import React from "react";

function getFieldType(result, field, type) {
  if (result[field]) return result[field][type];
}

function getRaw(result, field) {
  return getFieldType(result, field, "raw");
}

function getSnippet(result, field) {
  return getFieldType(result, field, "snippet");
}

function htmlEscape(str) {
  if (!str) return "";

  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getEscapedField(result, field) {
  // Fallback to raw values here, because non-string fields
  // will not have a snippet fallback. Raw values MUST be html escaped.
  const safeField =
    getSnippet(result, field) || htmlEscape(getRaw(result, field));
  return Array.isArray(safeField) ? safeField.join(", ") : safeField;
}

function Result({
  result,
  onClickLink,
  titleField,
  urlField,
  imageField,
  platformField,
  platformLinkField,
  priceField
}) {
  const title = getEscapedField(result, titleField);
  const url = getRaw(result, urlField);
  const image = getRaw(result, imageField);
  const price = getRaw(result, priceField);
  const platform = getEscapedField(result, platformField);
  const platformLink = getRaw(result, platformLinkField);

  return (
    <article className="sui-result">
      <a
        href={url}
        onClick={onClickLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="sui-result__img" src={image} alt=" " />
      </a>
      <p>
        <a href={platformLink} onClick={onClickLink}>
          {platform}
        </a>{" "}
        {price}
      </p>
      <a
        className="sui-result__title"
        dangerouslySetInnerHTML={{ __html: title }}
        href={url}
        onClick={onClickLink}
        target="_blank"
        rel="noopener noreferrer"
      />
    </article>
  );
}

Result.propTypes = {
  result: PropTypes.object.isRequired,
  onClickLink: PropTypes.func.isRequired,
  className: PropTypes.string,
  titleField: PropTypes.string,
  urlField: PropTypes.string,
  imageField: PropTypes.string,
  platformField: PropTypes.string,
  platformLinkField: PropTypes.string,
  priceField: PropTypes.string
};

export default Result;
