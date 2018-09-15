import React from 'react';
import { Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';
import { Input, ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ToggleDisplay from 'react-toggle-display';
import blueStatus from '../../assets/triangle-down-blue.svg';
import downStatus from '../../assets/triangle-down.svg';
import upStatus from '../../assets/triangle-up.svg';
import moreButton from '../../assets/more-button.svg';

import './index.css';

class Project extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleMoreFloating = this.handleMoreFloating.bind(this);
    this.handleMoreProduct = this.handleMoreProduct.bind(this);
    this.handleMoreSquad = this.handleMoreSquad.bind(this);
    this.handleMoreVacant = this.handleMoreVacant.bind(this);
    this.handleCompleteStatus = this.handleCompleteStatus.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleRejectedStatus = this.handleRejectedStatus.bind(this);
    this.handleOngoingStatus = this.handleOngoingStatus.bind(this);
    this.handleInqueueStatus = this.handleInqueueStatus.bind(this);
    this.toggleStatusChangeModal = this.toggleStatusChangeModal.bind(this);
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.state = {
      productLimit : 5,
      squadLimit: 5,
      floatingLimit: 5,
      vacantLimit: 5,
      showComment: false,
      openedProject: 0,
      commentModal: false,
      statusModal: false,
      projects : [
        {
          name: "Teman Sejati", 
          desc: "",
          unit: "TNT",
          stakeholder: "TNT",
          sprint: 15,
          status: "Complete",
          comment: ""
        },
        {
          name: "Teman Hidup", 
          desc: "",
          unit: "TNT",
          stakeholder: "TNT",
          sprint: 15,
          status: "Complete",
          comment: ""
        },
        {
          name: "Teman Berbagi", 
          desc: "",
          unit: "TNT",
          stakeholder: "TNT",
          sprint: 15,
          status: "Complete",
          comment: ""
        },
        {
          name: "MyIndihome", 
          desc: "",
          unit: "Consumer",
          stakeholder: "Consumer",
          sprint: 12,
          status: "Rejected",
          comment: ""
        },
        {
          name: "Bulir", 
          desc: "",
          unit: "TNT",
          stakeholder: "TNT",
          sprint: 15,
          status: "On Going",
          comment: ""
        },
        {
          name: "Dashboard Clap", 
          desc: "",
          unit: "Consumer",
          stakeholder: "Consumer",
          sprint: 12,
          status: "In Queue",
          comment: ""
        },
      ],
      talents:[
        {
          role: "UX",
          number: {vacant: 1, floating: 1}
        },
        {
          role: "FE",
          number: {vacant: 0, floating: 2}
        },
        {
          role: "BE",
          number: {vacant: 1, floating: 2}
        },
        {
          role: "MOBILE",
          number: {vacant: 1, floating:2}
        },
        {
          role: "EO",
          number: {vacant: 1, floating:2}
        },
        {
          role: "UI",
          number: {vacant: 1, floating:2}
        },
        
      ],
      products:[ //Already sorted by rank
        {
          name: "MyNation",
          diff: 0
        },
        {
          name: "YourLyfe",
          diff: 0
        },
        {
          name: "BUMN",
          diff: 2
        },
        {
          name: "MyIndihome",
          diff: 3
        },
        {
          name: "Sobat BUMN",
          diff: -1
        },
        {
          name: "Open Trip",
          diff: -2
        },
        {
          name: "ODP Hunter",
          diff: 5
        },
        {
          name: "SIIS",
          diff: 6
        }
      ]
    }
  }

  handleCompleteStatus() {
    const newProj = this.state.projects.slice();
    newProj[this.state.openedProject].status = "Complete";

    this.setState({
      projects: newProj,
      showComment: true
    });
  }

  handleRejectedStatus() {
    const newProj = this.state.projects.slice();
    newProj[this.state.openedProject].status = "Rejected";

    this.setState({
      projects: newProj,
      showComment: true
    });
  }

  handleOngoingStatus() {
    const newProj = this.state.projects.slice();
    newProj[this.state.openedProject].status = "On Going";

    this.setState({
      projects: newProj,
      showComment: false
    });
  }

  handleInqueueStatus() {
    const newProj = this.state.projects.slice();
    newProj[this.state.openedProject].status = "In Queue";

    this.setState({
      projects: newProj,
      showComment: false
    });
  }

  handleCommentChange(e){
    const idx = parseInt(e.target.alt);    
    const newProj = this.state.projects.slice();
    newProj[this.state.openedProject].desc = e.target.value;

    this.setState({
      projects: newProj
    })
  }

  toggleCommentModal(e) {
    const idx = parseInt(e.target.value);

    if (e.target.value !== undefined){
      this.setState({
        openedProject: idx,
        commentModal: !this.state.commentModal,
      });
    } else {
      this.setState({
        commentModal: !this.state.commentModal,
      });
    }
  }

  toggleStatusChangeModal(e) {
    const idx = parseInt(e.target.alt);
    if (e.target.alt !== undefined){
      if (this.state.projects[idx].status == "Complete" || this.state.projects[idx].status == "Rejected"){
        this.setState({
          showComment: true
        })
      }

      else {
        this.setState({
          showComment: false
        })
      }

      this.setState({
        statusModal: !this.state.statusModal,
        openedProject: idx
      });
    }
    else {
      this.setState({
        statusModal: !this.state.statusModal,
      });
    }
  }

  handleMoreFloating() {
    this.setState({
      floatingLimit: this.state.floatingLimit+5
    })
  }
  
  handleMoreProduct() {
    this.setState({
      productLimit: this.state.productLimit+5
    })
  }

  handleMoreVacant() {
    this.setState({
      vacantLimit: this.state.vacantLimit+5
    })
  }

  handleMoreSquad() {
    this.setState({
      squadLimit: this.state.squadLimit+5
    })
  }

  render() {
    const { projects, talents, products, openedProject } = this.state;
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
                {/* Project Comment Modal */}
                <Modal isOpen={this.state.commentModal} toggle={this.toggleCommentModal} className={this.props.className}>
                  {/* <ModalHeader toggle={this.toggleStatusChangeModal}>Change {projects[openedProject].name} Status</ModalHeader> */}
                  <ModalBody>
                    <h3>Comment</h3>
                    {/* Comment Section */}
                    <Input onChange={this.handleCommentChange} alt={this.state.openedProject} type="textarea" placeholder="Add comment here..." value={projects[this.state.openedProject].desc}></Input>
                  </ModalBody>
                  <ModalFooter>
                    <Button value={this.state.openedProject} color="primary" onClick={this.toggleCommentModal}>Save</Button>{' '}
                  </ModalFooter>
                </Modal>
                {/* Status Change Modal */}
                <Modal isOpen={this.state.statusModal} toggle={this.toggleStatusChangeModal} className={this.props.className}>
                  <ModalHeader toggle={this.toggleStatusChangeModal}>Change {projects[openedProject].name} Status</ModalHeader>
                  <ModalBody>
                  <ButtonGroup>
                    <Button color={(projects[openedProject].status == "Complete" ? 'primary' : 'secondary')} onClick={this.handleCompleteStatus}>Complete</Button>
                    <Button color={(projects[openedProject].status == "Rejected" ? 'primary' : 'secondary')} onClick={this.handleRejectedStatus}>Rejected</Button>
                    <Button color={(projects[openedProject].status == "On Going" ? 'primary' : 'secondary')} onClick={this.handleOngoingStatus}>On Going</Button>
                    <Button color={(projects[openedProject].status == "In Queue" ? 'primary' : 'secondary')} onClick={this.handleInqueueStatus}>In Queue</Button>
                  </ButtonGroup>
                  {/* Comment Section */}
                  <ToggleDisplay show={this.state.showComment}>
                    <p></p>
                    <h3>Comment</h3>
                    <Input type="textarea" name="text" id="exampleText" placeholder="Add comment here..."/>
                  </ToggleDisplay>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleStatusChangeModal}>Save</Button>{' '}
                  </ModalFooter>
                </Modal>
                {
                  projects.map((project, index) => {
                    if (project.status == "Complete")
                      return(
                        <tr>
                          <td className="number-col">{index+1}</td>
                          <td><Button value={index} color="link" className="link-button" onClick={this.toggleCommentModal}>{project.name}</Button></td>
                          <td>{project.unit}</td>
                          <td>{project.stakeholder}</td>
                          <td className="number-col">{project.sprint}</td>  
                          <td className="status-complete">{project.status}<span className="information"><img className="status-icon" onClick={this.toggleStatusChangeModal} alt={index} src={blueStatus}></img></span></td>
                        </tr>
                      )
                    else if (project.status == "Rejected")
                      return(
                        <tr>
                          <td className="number-col">{index+1}</td>
                          <td><Button value={index} color="link" className="link-button" onClick={this.toggleCommentModal}>{project.name}</Button></td>
                          <td>{project.unit}</td>
                          <td>{project.stakeholder}</td>
                          <td className="number-col">{project.sprint}</td>  
                          <td className="status-rejected">{project.status}<span className="information"><img className="status-icon" onClick={this.toggleStatusChangeModal} alt={index} src={blueStatus}></img></span></td>
                        </tr>
                      )
                      else if (project.status == "On Going")
                        return(
                          <tr>
                            <td className="number-col">{index+1}</td>
                            <td><Button value={index} color="link" className="link-button" onClick={this.toggleCommentModal}>{project.name}</Button></td>
                            <td>{project.unit}</td>
                            <td>{project.stakeholder}</td>
                            <td className="number-col">{project.sprint}</td>  
                            <td className="status-ongoing">{project.status}<span className="information"><img className="status-icon" onClick={this.toggleStatusChangeModal} alt={index} src={blueStatus}></img></span></td>
                          </tr>
                        )
                        else if (project.status == "In Queue")
                          return(
                            <tr>
                              <td className="number-col">{index+1}</td>
                              <td><Button value={index} color="link" className="link-button" onClick={this.toggleCommentModal}>{project.name}</Button></td>
                              <td>{project.unit}</td>
                              <td>{project.stakeholder}</td>
                              <td className="number-col">{project.sprint}</td>  
                              <td className="status-inqueue">{project.status}<span className="information"><img className="status-icon" onClick={this.toggleStatusChangeModal} alt={index} src={blueStatus}></img></span></td>
                            </tr>
                          )
                  })
                }
            </tbody>
          </Table>
        </div>
        {/* Best Product List*/}
        <div className="grid-container">
          <div>
            <h5 className="grid-title">Best Product Performance</h5>
            { 
              products.map((product, index) => {
                if (index < this.state.productLimit){
                  if (product.diff >= 0)
                    return(
                      <p>{index+1}. {product.name}<span className="information"><img className="status-icon" src={upStatus}></img>&nbsp;&nbsp;{product.diff}</span></p>
                    )
                  else
                    return(
                      <p>{index+1}. {product.name}<span className="information"><img className="status-icon" src={downStatus}></img>&nbsp;&nbsp;{-1*product.diff}</span></p>
                    )
                }
              })
            }
            <img className="more-button" onClick={this.handleMoreProduct} src={moreButton}></img>
          </div>
          <div>
            <h5 className="grid-title">Best Squad Performance</h5>
            { 
              products.map((product, index) => {
                if (index < this.state.squadLimit){
                  if (product.diff > 0)
                    return(
                      <p>{index+1}. Squad {index} - {product.name}<span className="information"><img className="status-icon" src={upStatus}></img>&nbsp;&nbsp;{product.diff}</span></p>
                    )
                  else
                    return(
                      <p>{index+1}. Squad {index} - {product.name}<span className="information"><img className="status-icon" src={downStatus}></img>&nbsp;&nbsp;{-1*product.diff}</span></p>
                    )
                }
              })
            }
            <img className="more-button" onClick={this.handleMoreSquad} src={moreButton}></img>
          </div>
          <div>
            <h5 className="grid-title">Talent</h5>
            <Row>
              <Col sm="6" md="6">
                <p>Floating</p>
                {
                  talents.map((talent, index) => {
                    if (index < this.state.floatingLimit){
                      return (
                        <p>{talent.role}<span className="information">{talent.number.floating}</span></p>    
                      )
                    }
                  })
                }
                <img className="more-button-center" onClick={this.handleMoreFloating} src={moreButton}></img>
              </Col>
              <Col sm="6" md="6">
                <p>Vacant</p>
                {
                  talents.map((talent, index) => {
                    if (index < this.state.vacantLimit){
                      return(
                        <p>{talent.role}<span className="information">{talent.number.vacant}</span></p>    
                      )
                    }
                  })
                }
                <img className="more-button-center" onClick={this.handleMoreVacant} src={moreButton}></img>
              </Col>
            </Row>
          </div>  
        </div>
      </div>
    );
  }
}

export default Project;
