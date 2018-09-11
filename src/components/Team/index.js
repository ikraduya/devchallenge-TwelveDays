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
              id: 1,
              nama: "Budi Artianto",
              stream: "Backend",
              pointBurnHist: [0, 100, 110, 101],
              pointRemainingHist: [0, 100, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 4,
            },
            {
              id: 2,
              nama: "Tono Budiman",
              stream: "Backend",
              pointBurnHist: [0, 100, 110, 102],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 4,
            },
            {
              id: 3,
              nama: "Wawan Aja",
              stream: "Frontend",
              pointBurnHist: [0, 100, 110, 0],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 4,
            },
            {
              id: 4,
              nama: "HEHE Aja",
              stream: "Frontend",
              pointBurnHist: [0, 100, 110, 105],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 4,
            },
            {
              id: 5,
              nama: "KWEK Aja",
              stream: "Frontend",
              pointBurnHist: [0, 100, 110, 105],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 4,
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
              id: 1,
              nama: "Budi Artianto2",
              stream: "Backend2",
              pointBurnHist: [0, 100, 110, 105],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 4,
            },
            {
              id: 2,
              nama: "Tono Budiman2",
              stream: "Backend2",
              pointBurnHist: [0, 100, 110, 105],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 4,
            },
            {
              id: 3,
              nama: "Wawan Aja2",
              stream: "Frontend2",
              pointBurnHist: [0, 100, 110, 105],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 3,
            },
            {
              id: 4,
              nama: "HEHE Aja2",
              stream: "Frontend2",
              pointBurnHist: [0, 100, 110, 105],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 0,
            },
            {
              id: 5,
              nama: "KWEK Aja2",
              stream: "Frontend2",
              pointBurnHist: [0, 100, 110, 105],
              pointRemainingHist: [0, 10, 20, 30],
              pointQueueHist: [0, 20, 11, 30],
              star: 2,
            },
          ]
        },
      ],
      selectedProject: {},
      isModalOpen: false,
      selectedTalent: {},
    }
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    const { projectList } = this.state;
    console.log("sudah kepanggil");
    if (projectList.length > 0) {
      this.setState({
        selectedProject: projectList[0],
      });
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

  handleTalentNameClick(event, selectedId) {
    const { memberList } = this.state.selectedProject;

    event.preventDefault();
    console.log(selectedId);
    this.setState({
      selectedTalent: (memberList.length > 0) ? memberList.find((member) => (member.id === selectedId)) : {},
    }, () => {
      this.setState({
        isModalOpen: true,
      })
    })
  }

  handleBackButton() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      selectedTalent: {},
    })
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
    if (memberList && memberList.length > 0) {
      return memberList.map((member, index) => (
        <tr key={index}>
          <td className="text-center" ><span>{index + 1}</span></td>
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
    if (memberList && memberList.length > 0) {
      const sortedMemberList = memberList.sort((mem1, mem2) => (mem2.pointBurnHist[3] - mem1.pointBurnHist[3]));
      return sortedMemberList.map((member, index) => (
        <tr key={index}>
          <td className="text-center"><span>{index + 1}</span></td>
          <td className="talent-name"><a href="" onClick={e => this.handleTalentNameClick(e, member.id)}><span>{member.nama}</span></a></td>
          <td><span>{member.stream}</span></td>
          <td className="text-center"><span>{member.pointBurnHist[3]}</span></td>
          <td className="text-center"><span>{member.pointRemainingHist[3]}</span></td>
          <td className="text-center"><span>{member.pointQueueHist[3]}</span></td>
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
    const { projectList, selectedTalent, isModalOpen } = this.state;

    return (
      <div id="team-page">
        <TalentModal
          toggle={this.handleBackButton}
          isOpen={isModalOpen}
          className="talent-modal"
          selectedTalent={selectedTalent}
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
                    projectList.map((project, index) => (
                      <option key={index}>{project.title}</option>
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
