import React from "react";
import { withSearch } from "@elastic/react-search-ui";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useTranslation, withTranslation, Trans } from 'react-i18next';


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
  const { selected,labelText, labelInfo, color, bgColor, ...other } = props;
  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
        {selected && (
            <CheckIcon />
         )}
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
  selected: PropTypes.bool,
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
  const { t, i18n } = useTranslation();

  const filter = filters.find(f => f.field === "category" && f.type === "any");

  var facet = facets["category"];
  if(facet!==undefined) {
    facet = facet[0];
  }else {
    facet = {
      data:[]
    };
  }
  function toggleSelection(id,parent) {
    console.log(filter);
    if(!filter) {
      addFilter('category',id,'any');
      if(parent) {
        removeFilter('category',parent,'any');
      }
    }else if(filter.values.includes(id)){
      removeFilter('category',id,'any');
    }else {
      addFilter('category',id,'any');
      if(parent) {
        removeFilter('category',parent,'any');
      }
    }

  }
  return (
    <fieldset className="sui-facet">
    <legend className="sui-facet__title">{t('label.category')}</legend>
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
    <StyledTreeItem key={item.id} nodeId={item.id} selected={filter?filter.values.includes(item.id):false}
     labelText={item.label} onClick={() => toggleSelection(item.id,null)}
     labelInfo={item.count>0?""+item.count:""}
     >
      {item.children.map((sub) => {
        return (
        <StyledTreeItem key={sub.id} selected={filter?filter.values.includes(sub.id):false}
          nodeId={sub.id} onClick={() => toggleSelection(sub.id,item.id)}
          labelText={sub.label}
          labelInfo={sub.count>0?""+sub.count:""}
          color="#3a3a3a"
          bgColor="#e8f0fe"
        >
            {sub.children.map((sub2) => {
              return (
              <StyledTreeItem key={sub2.id} selected={filter?filter.values.includes(sub2.id):false}
                nodeId={sub2.id} onClick={() => toggleSelection(sub2.id,sub.id)}
                labelText={sub2.label}
                labelInfo={sub2.count>0?""+sub2.count:""}
                color="#1a73e8"
                bgColor="#e8f0fe"
              />
            );
            })}

        </StyledTreeItem>
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


CategoryFacet.propTypes = {
  // Props
  label: PropTypes.string
};


export default withSearch(({ filters, clearFilters,addFilter,setFilter,removeFilter,facets }) => ({
  filters,
  clearFilters,
  addFilter,
  setFilter,
  removeFilter,
  facets
}))(CategoryFacet);
