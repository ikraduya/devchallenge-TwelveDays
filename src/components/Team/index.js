import React from 'react';
import {
  Container,
  Row, 
  Col,
  Input,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

import TalentModal from './TalentModal';
import './index.css';

class Team extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [
        {
          title: "My Indihome Consumen",
          desc: "This is sample description about project",
          stackHolder: "DEGM",
          sprintNow: 4,
          startDate: "12/06/2018",
          endDate: "22/06/2018",
          memberList: [
            {
              nama: "Budi Artianto",
              stream: "Backend",
              pointBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,
            },
            {
              nama: "Tono Budiman",
              stream: "Backend",
              pointBurn: 102,
              pointRemaining: 12,
              pointQueue: 30,
            },
            {
              nama: "Wawan Aja",
              stream: "Frontend",
              pointBurn: 109,
              pointRemaining: 30,
              pointQueue: 30,
            },
            {
              nama: "HEHE Aja",
              stream: "Frontend",
              pointBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,
            },
            {
              nama: "KWEK Aja",
              stream: "Frontend",
              popointBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,intBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,
            },
          ]
        },
        {
          title: "My Indihome Consumen2",
          desc: "This is sample description about project2",
          stackHolder: "DEGM2",
          sprintNow: 4,
          startDate: "12/06/2018",
          endDate: "22/06/2018",
          memberList: [
            {
              nama: "Budi Artianto2",
              stream: "Backend2",
              pointBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,
            },
            {
              nama: "Tono Budiman2",
              stream: "Backend2",
              pointBurn: 102,
              pointRemaining: 12,
              pointQueue: 30,
            },
            {
              nama: "Wawan Aja2",
              stream: "Frontend2",
              pointBurn: 109,
              pointRemaining: 30,
              pointQueue: 30,
            },
            {
              nama: "HEHE Aja2",
              stream: "Frontend2",
              pointBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,
            },
            {
              nama: "KWEK Aja2",
              stream: "Frontend2",
              popointBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,intBurn: 105,
              pointRemaining: 30,
              pointQueue: 30,
            },
          ]
        },
      ],
      selectedProject: {
        title: "My Indihome Consumen",
        desc: "This is sample description about project",
        stackHolder: "DEGM",
        sprintNow: 4,
        startDate: "12/06/2018",
        endDate: "22/06/2018",
        memberList: [
          {
            nama: "Budi Artianto",
            stream: "Backend",
            pointBurn: 105,
            pointRemaining: 30,
            pointQueue: 30,
          },
          {
            nama: "Tono Budiman",
            stream: "Backend",
            pointBurn: 102,
            pointRemaining: 12,
            pointQueue: 30,
          },
          {
            nama: "Wawan Aja",
            stream: "Frontend",
            pointBurn: 109,
            pointRemaining: 30,
            pointQueue: 30,
          },
          {
            nama: "HEHE Aja",
            stream: "Frontend",
            pointBurn: 105,
            pointRemaining: 30,
            pointQueue: 30,
          },
          {
            nama: "KWEK Aja",
            stream: "Frontend",
            popointBurn: 105,
            pointRemaining: 30,
            pointQueue: 30,intBurn: 105,
            pointRemaining: 30,
            pointQueue: 30,
          },
        ]
      },
    }
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  componentDidMount() {
    const { projectList } = this.state;
    if (projectList.length > 0) {
      this.setState({
        selectedProject: projectList[0],
      })
    }
  }

  handleProjectChange(event) {
    const { target } = event;
    const { projectList, selectedProject } = this.state;

    if (target.value !== selectedProject.title) {
      this.setState({
        selectedProject: projectList.find((project) => (project.title == target.value)),
      })
    }
  }

  renderMemberTableHeader() {
    return (
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Stream</th>
      </tr>
    );
  }

  renderMemberList() {
    const { memberList } = this.state.selectedProject;
    if (memberList.length > 0) {
      return memberList.map((member, index) => (
        <tr>
          <td><span>{index + 1}</span></td>
          <td><span>{member.nama}</span></td>
          <td><span>{member.stream}</span></td>
        </tr>
      ));
    } else {
      return null;
    }
  }

  // Member table
  renderMemberTableHeader() {
    return (
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Stream</th>
      </tr>
    );
  }
  renderMemberList() {
    const { memberList } = this.state.selectedProject;
    if (memberList.length > 0) {
      return memberList.map((member, index) => (
        <tr>
          <td><span>{index + 1}</span></td>
          <td><span>{member.nama}</span></td>
          <td><span>{member.stream}</span></td>
        </tr>
      ));
    } else {
      return null;
    }
  }

  // Best talent table
  renderTalentTableHeader() {
    return (
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Stream</th>
        <th>Point Burn</th>
        <th>Point Remaining</th>
        <th>Point Queue</th>
      </tr>
    );
  }
  renderTalentList() {
    const { memberList } = this.state.selectedProject;
    if (memberList.length > 0) {
      return memberList.map((member, index) => (
        <tr>
          <td><span>{index + 1}</span></td>
          <td><span>{member.nama}</span></td>
          <td><span>{member.stream}</span></td>
          <td><span>{member.pointBurn}</span></td>
          <td><span>{member.pointRemaining}</span></td>
          <td><span>{member.pointQueue}</span></td>
        </tr>
      ));
    } else {
      return null;
    }
  }

  render() {
    const {
      title: titleProject, desc, stackHolder, sprintNow, startDate, endDate,
    } = this.state.selectedProject;
    const { projectList, selectedTalent } = this.state;

    return (
      <div id="team-page">
        <TalentModal
          // toggle={this.handleCancelButton}
          // isOpen={isOpen}
          className="talent-modal"
          // selectedTalent={selectedTalent}
        />
        <Row noGutters id="project-and-member-card">
          <Col id="project-card" md="6">
            <Row className="card-title">
              <Col md="3" className="title">
                Project
              </Col>
              <Col md="9" className="project-select">
                <Input type="select" id="project-select-input" onChange={this.handleProjectChange} value={titleProject}>
                  {
                    projectList.map((project) => (
                      <option>{project.title}</option>
                    ))
                  }
                </Input>
              </Col>
            </Row>
            <Row style={{marginBottom: "0.75rem"}}>
              <Col>
                <div>Description  : {desc}</div>
                <div>Stack holder : {stackHolder}</div>
                <div>Sprint Now   : {sprintNow}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>Start Date   : {startDate}</div>
                <div>End holder   : {endDate}</div>
              </Col>
            </Row>
          </Col>

          <Col id="member-card" md="6">
            <Row className="card-title">
              <Col md="3" className="title">
                Member
              </Col>
            </Row>
            <Row noGutters id="member-table">
              <Table responsive>
                <thead>
                  {this.renderMemberTableHeader()}
                </thead>
                <tbody>
                  {this.renderMemberList()}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
        <Row noGutters id="best-talent-card">
          <Col md="12">
            <Row className="card-title">
              <Col md="12" className="title">
                Best Talent Performance
              </Col>
            </Row>
            <Row noGutters id="best-talent-table">
              <Table responsive>
                <thead>
                  {this.renderTalentTableHeader()}
                </thead>
                <tbody>
                  {this.renderTalentList()}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Team;
