import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { SideNav } from '../NavigationPanel';
import LoadingCSS from '../../commons/LoadingCSS';

const renderSideNav = (boolean, props) => {
  if (boolean) {
    return <SideNav {...props} />;
  }
  return null;
};

class Layout extends Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest} render={(props) => {
        return (
          <div>
            <link rel="stylesheet" type="text/css" id='index' href="/index.css" />
            <LoadingCSS targetIds='index'/>
            {renderSideNav(rest.navbar, props)}
            <div className="main-content-container">
              <Component {...props}/>
            </div>
          </div>
        )
      }}/>
    );
  }
}

export default Layout;
