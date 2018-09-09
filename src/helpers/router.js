import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';

/**
 * Component to automate scroll on top after loaded
 */
class ScrollToTopComponent extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      setTimeout(() => window.scrollTo(0, 0), this.props.timeout);
    }
  }
  render() {
    return this.props.children;
  }
}
ScrollToTopComponent.propTypes = {
  location: PropTypes.object,
  children: PropTypes.any,
  timeout: PropTypes.number,
}
ScrollToTopComponent.defaultProps = {
  location: {},
  children: null,
  timeout: 500,
}
export const ScrollToTop = withRouter(ScrollToTopComponent);

/**
 * Component wrapper for router routes
 */
export const RouteWrapper = withRouter(({ location, children, timeout }) => (
  <TransitionGroup className="transition-group">
    <CSSTransition
      key={location.key}
      timeout={{ enter: timeout, exit: timeout }}
      classNames="fade"
    >
      <section className="route-section">
        <Switch location={location}>
          {children}
        </Switch>
      </section>
    </CSSTransition>
  </TransitionGroup>
));
RouteWrapper.propTypes = {
  location: PropTypes.object,
  children: PropTypes.any,
  timeout: PropTypes.number,
}
RouteWrapper.defaultProps = {
  location: {},
  children: null,
  timeout: 500,
}