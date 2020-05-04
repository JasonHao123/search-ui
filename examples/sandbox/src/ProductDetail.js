import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';

class ProductDetail extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.id);
    axios.get(`http://www.reddit.com/r/${params.id}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  render() {
    return (
      <button
          type="button"
          onClick={() => this.props.history.goBack()}
        >
          Navigate
        </button>
    );
  }
}


ProductDetail.propTypes = {
  params: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(ProductDetail);
