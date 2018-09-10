import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import './index.css';

class Project extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div id="project-page">
        <h1>Project</h1>
      </div>
    );
  }
}

export default Project;
