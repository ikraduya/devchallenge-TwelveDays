import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

class SideNav extends React.Component {
  render() {
    const  { pathname } = window.location;

    return (
    <div className="sidenav">
      <div id="codex-logo"/>
      <Nav vertical>
        <NavLink className={pathname === '/project' ? 'selected' : ''} href="/project">Project</NavLink>
        <NavLink className={pathname === '/team' ? 'selected' : ''} href="/team">Team Performance</NavLink>
        <NavLink className={pathname === '/calender' ? 'selected' : ''} href="/calender">Calendar</NavLink>
      </Nav>
    </div>
    );
  }
}

export default SideNav;
