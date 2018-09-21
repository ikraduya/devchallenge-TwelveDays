import React from 'react';
import {
  Row, 
  Col,
  Input,
  Table,
} from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert2';
import moment from 'moment';

import TalentModal from './TalentModal';
import './index.css';

const timeFormat = 'DD/MM/YYYY';
class Team extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      selectedProject: {},
      isModalOpen: false,
      selectedTalent: {},
    }
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    axios.get('/api/project/projects')
      .then(({ data: res }) => {
        if (res.status === 'success') {
          this.setState({
            projectList: res.data || [],
          }, () => {
            const { projectList } = this.state;
            if (projectList.length > 0) {
              this.setState({
                selectedProject: projectList[0],
              });
            }
          });
        } else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: res.message,
          });
        }
      })
      .catch(() => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Could not contact the server',
        });
      });
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
      selectedTalent: (memberList.length > 0) ? memberList.find((member) => (member._id === selectedId)) : {},
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
          <td><span>{member.name}</span></td>
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
          <td className="talent-name"><a href="" onClick={e => this.handleTalentNameClick(e, member._id)}><span>{member.name}</span></a></td>
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
      title: titleProject, desc, stakeholder, sprint, startDate, endDate,
    } = this.state.selectedProject;
    const { projectList, selectedTalent, isModalOpen } = this.state;

    const diffInDays = moment.duration(moment(endDate).diff(moment(startDate))).asDays();

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
            <Row className="project-desc">
              <table>
                <tr>
                  <td style={{width: "115px"}}>Description</td>
                  <td>:</td>
                  <td>{desc}</td>
                </tr>
                <tr>
                  <td>Stack holder</td>
                  <td>:</td>
                  <td>{stakeholder}</td>
                </tr>
                <tr>
                  <td>Sprint Now</td>
                  <td>:</td>
                  <td>{sprint}</td>
                </tr>
                <tr style={{fontSize: "0.4rem"}}><td>&nbsp;</td><td> </td><td ></td></tr>
                <tr style={{fontSize: "0.9rem"}}>
                  <td>Start Date</td>
                  <td>:</td>
                  <td>{moment(startDate).format(timeFormat)}</td>
                </tr>
                <tr style={{fontSize: "0.9rem"}}>
                  <td>End Date</td>
                  <td>:</td>
                  <td>{moment(endDate).format(timeFormat)} ({diffInDays} hari lagi)</td>
                </tr>
                
              </table>
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
