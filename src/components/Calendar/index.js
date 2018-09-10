import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import './index.css';

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div id="calendar-page">
        <h1>Calendar</h1>
      </div>
    );
  }
}

export default Calendar;
