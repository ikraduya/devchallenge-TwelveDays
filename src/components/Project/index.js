import React from 'react';
import { Row, Col } from 'reactstrap';
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
      projects : [
        {
          name: "Teman Berbagi", 
          unit: "TNT",
          stakeholder: "TNT",
          sprint: 15,
          status: "Complete",
        },
        {
          name: "MyIndihome", 
          unit: "Consumer",
          stakeholder: "Consumer",
          sprint: 12,
          status: "Rejected",
        },
        {
          name: "Bulir", 
          unit: "TNT",
          stakeholder: "TNT",
          sprint: 15,
          status: "On Going",
        },
        {
          name: "Dashboard Clap", 
          unit: "Consumer",
          stakeholder: "Consumer",
          sprint: 12,
          status: "In Queue",
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
      ],
      products:[ //Already sorted by rank
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

  render() {
    const { projects, talents, products } = this.state;
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
                {
                  projects.map((project, index) => {
                    if (project.status == "Complete")
                      return(
                        <tr>
                          <td className="number-col">{index+1}</td>
                          <td><a href="#">{project.name}</a></td>
                          <td>{project.unit}</td>
                          <td>{project.stakeholder}</td>
                          <td className="number-col">{project.sprint}</td>  
                          <td className="status-complete">{project.status}<span className="information"><img className="status-icon" src={blueStatus}></img></span></td>
                        </tr>
                      )
                    else if (project.status == "Rejected")
                      return(
                        <tr>
                          <td className="number-col">{index+1}</td>
                          <td><a href="#">{project.name}</a></td>
                          <td>{project.unit}</td>
                          <td>{project.stakeholder}</td>
                          <td className="number-col">{project.sprint}</td>  
                          <td className="status-rejected">{project.status}<span className="information"><img className="status-icon" src={blueStatus}></img></span></td>
                        </tr>
                      )
                      else if (project.status == "On Going")
                        return(
                          <tr>
                            <td className="number-col">{index+1}</td>
                            <td><a href="#">{project.name}</a></td>
                            <td>{project.unit}</td>
                            <td>{project.stakeholder}</td>
                            <td className="number-col">{project.sprint}</td>  
                            <td className="status-ongoing">{project.status}<span className="information"><img className="status-icon" src={blueStatus}></img></span></td>
                          </tr>
                        )
                        else if (project.status == "In Queue")
                          return(
                            <tr>
                              <td className="number-col">{index+1}</td>
                              <td><a href="#">{project.name}</a></td>
                              <td>{project.unit}</td>
                              <td>{project.stakeholder}</td>
                              <td className="number-col">{project.sprint}</td>  
                              <td className="status-inqueue">{project.status}<span className="information"><img className="status-icon" src={blueStatus}></img></span></td>
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
                if (product.diff > 0)
                  return(
                    <p>{index}. {product.name}<span className="information"><img className="status-icon" src={upStatus}></img>&nbsp;&nbsp;{product.diff}</span></p>
                  )
                else
                  return(
                    <p>{index}. {product.name}<span className="information"><img className="status-icon" src={downStatus}></img>&nbsp;&nbsp;{-1*product.diff}</span></p>
                  )
              })
            }
            <a href="#"><img className="more-button" src={moreButton}></img></a>
          </div>
          <div>
            <h5 className="grid-title">Best Squad Performance</h5>
            { 
              products.map((product, index) => {
                if (product.diff > 0)
                  return(
                    <p>{index}. Squad {index} - {product.name}<span className="information"><img className="status-icon" src={upStatus}></img>&nbsp;&nbsp;{product.diff}</span></p>
                  )
                else
                  return(
                    <p>{index}. Squad {index} - {product.name}<span className="information"><img className="status-icon" src={downStatus}></img>&nbsp;&nbsp;{-1*product.diff}</span></p>
                  )
              })
            }
            <a href="#"><img className="more-button" src={moreButton}></img></a>
          </div>
          <div>
            <h5 className="grid-title">Talent</h5>
            <Row>
              <Col sm="6" md="6">
                <p>Floating</p>
                {
                  talents.map((talent, index) => {
                    return (
                      <p>{talent.role}<span className="information">{talent.number.floating}</span></p>    
                    )
                  })
                }
                <a href="#"><img className="more-button-center" src={moreButton}></img></a>
              </Col>
              <Col sm="6" md="6">
                <p>Vacant</p>
                {
                  talents.map((talent, index) => {
                    return(
                      <p>{talent.role}<span className="information">{talent.number.vacant}</span></p>    
                    )
                  })
                }
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
