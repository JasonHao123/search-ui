import React from "react";
import { withSearch } from "@elastic/react-search-ui";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    minHeight: 100,
    flexGrow: 1,
    maxWidth: 400,
  },
});


function CategoryFacet({ filters, clearFilters,addFilter,setFilter,removeFilter,facets }) {
  const classes = useStyles();
  console.log(facets);
  var facet = facets["states"];
  if(facet!==undefined) {
    facet = facet[0];
  }else {
    facet = {
      data:[]
    };
  }
  console.log(facet);
  return (
    <fieldset className="sui-facet">
    <legend className="sui-facet__title">World Heritage Site</legend>
    <div className="sui-boolean-facet">
    <TreeView
      className={classes.root}
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
    {facet.data.map((item) => {
      return (
    <StyledTreeItem key={item.id} nodeId={item.id} labelText={item.value} labelIcon={MailIcon} labelInfo={""+item.count}>
      {item.children.map((sub) => {
        return (
        <StyledTreeItem key={sub.id}
          nodeId={sub.id} onClick={() => addFilter('states',sub.value,'any')}
          labelText={sub.value}
          labelIcon={SupervisorAccountIcon}
          labelInfo={""+sub.count}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
      );
      })}
    </StyledTreeItem>
  );
})}

    </TreeView>
    </div>
    </fieldset>
  );
}

export default withSearch(({ filters, clearFilters,addFilter,setFilter,removeFilter,facets }) => ({
  filters,
  clearFilters,
  addFilter,
  setFilter,
  removeFilter,
  facets
}))(CategoryFacet);
