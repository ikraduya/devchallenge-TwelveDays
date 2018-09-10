import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import './index.css';

class Team extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div id="team-page">
        <h1>Team</h1>
      </div>
    );
  }
}

export default Team;
