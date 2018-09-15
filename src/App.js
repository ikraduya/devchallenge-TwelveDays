import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import logo from './logo.svg';
import LoadingCSS from './commons/LoadingCSS';
import { Layout } from './commons/Layout';
import { ScrollToTop, RouteWrapper } from './helpers/router';

import './App.css';

const componentList = {
  'Team': import('./components/Team'),
  'Project': import('./components/Project'),
  'Calendar': import('./components/Calendar'),
  'NoMatch': import('./components/NoMatch'),
};

const setUpLoadable = (component) => Loadable({
  loader: () => componentList[component],
  loading: LoadingCSS,
});

const Team = setUpLoadable('Team');
const Project = setUpLoadable('Project');
const Calendar = setUpLoadable('Calendar');
const NoMatch = setUpLoadable('NoMatch');

const App = () => (
  <BrowserRouter>
    <ScrollToTop timeout={200}>
      <RouteWrapper timeout={400}>
        <Layout navbar exact path="/" component={Project} />
        <Layout navbar exact path="/project" component={Project} />
        <Layout navbar exact path="/team" component={Team} />
        <Layout navbar exact path="/calendar" component={Calendar} />
        <Layout navbar exact path="/404" component={NoMatch} />
        <Layout navbar exact component={NoMatch} />
      </RouteWrapper>
    </ScrollToTop>
  </BrowserRouter>
  )

export default App;
