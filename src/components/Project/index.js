import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Table } from 'reactstrap';
import blueStatus from '../../assets/triangle-down-blue.svg';
import downStatus from '../../assets/triangle-down.svg';
import upStatus from '../../assets/triangle-up.svg';
import moreButton from '../../assets/more-button.svg';

import './index.css';

class Project extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div id="project-page-wrapper">
        <div id="project-page">
          <h3>Que All Project</h3>
          {/* Project List */}
          <Table bordered id="project-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Project</th>
                <th>Unit</th>
                <th>Stakeholder</th>
                <th>Sprint</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="number-col">1</td>
                <td><a href="#">Teman Berbagi</a></td>
                <td>TNT</td>
                <td>TNT</td>
                <td className="number-col">15</td>
                <td className="status-complete">Complete<span className="information"><img className="status-icon" src={blueStatus}></img></span></td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/* Best Product List*/}
        <div class="grid-container">
          <div>
            <h5 className="grid-title">Best Product Performance</h5>
            <p>1. MyIndihome<span className="information"><img className="status-icon" src={upStatus}></img>&nbsp;&nbsp;3</span></p>
            <a href="#"><img className="more-button" src={moreButton}></img></a>
          </div>
          <div>
            <h5 className="grid-title">Best Squad Performance</h5>
            <p>1. Squad 1 - MyIndihome<span className="information"><img className="status-icon" src={upStatus}></img>&nbsp;&nbsp;3</span></p>
            <a href="#"><img className="more-button" src={moreButton}></img></a>
          </div>
          <div>
            <h5 className="grid-title">Talent</h5>
            <Row>
              <Col sm="6" md="6">
                <p>Floating</p>
                <p>BE<span className="information">1</span></p>
                <a href="#"><img className="more-button-center" src={moreButton}></img></a>
              </Col>
              <Col sm="6" md="6">
                <p>Vacant</p>
                <p>BE<span className="information">1</span></p>
                <a href="#"><img className="more-button-center" src={moreButton}></img></a>
              </Col>
            </Row>
          </div>  
        </div>
      </div>
    );
  }
}

export default Project;
