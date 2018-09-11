import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

class TalentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      isOpen, toggle, className, selectedTalent,
    } = this.props;
    const { nama, stream, star, pointBurnHist, pointRemainingHist, pointQueueHist } = selectedTalent;

    let level = '';
    if (star === 0) {
      level = 'Newbie';
    } else if (star === 1) {
      level = 'Beginner';
    } else if (star === 2) {
      level = 'Rookie';
    } else if (star === 3) {
      level = 'Novice';
    } else if (star === 4) {
      level = 'Expert';
    } else if (star === 5) {
      level = 'Master';
    }

    const dataPointBurn = pointBurnHist ? pointBurnHist.map((hist, index) => ({x: `Periode ${index+1}`, y: hist})) : [];
    const dataPointRemain = pointRemainingHist ? pointRemainingHist.map((hist, index) => ({x: `Periode ${index+1}`, y: hist})) : [];
    const dataPointQueue = pointQueueHist ? pointQueueHist.map((hist, index) => ({x: `Periode ${index+1}`, y: hist})) : [];

    const totalPoint = (pointBurnHist && pointRemainingHist && pointQueueHist) ? (pointBurnHist[3] + pointRemainingHist[3] + pointQueueHist[3]) : 0;


    return(
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalBody>
          <Row>
            <Col id="profile-pic" md="5">
            </Col>
            <Col id="info" col="7">
              <Row id="printed-info" noGutters>
                <Col>
                  <div>Nama&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {nama}</div>
                  <div>Stream&nbsp;&nbsp;&nbsp;: {stream}</div>
                  <div>Level&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {level}</div>
                </Col>
              </Row>
              <Row id="star" noGutters>
                <StarRatingComponent
                  name="userRating"
                  editing={false}
                  starCount={5}
                  value={star}
                  starColor="#FFD43B"
                  emptyStarColor="#AEB9CB"
                />
              </Row>
            </Col>
          </Row>
          <Row id="work-intensity" noGutters>
            <div className="title">
              Work Intensity
            </div>
            <div className="graph-plot">
              <div className="legend">
                <ul>
                  <li className="point-burn">Point Burn</li>
                  <li className="point-remain">Point Remain</li>
                  <li className="point-queue">Point Queue</li>
                </ul>
              </div>
              <XYPlot
                xType="ordinal"
                xDomain={['Periode 1', 'Periode 2', 'Periode 3', 'Periode 4']}
                width={450}
                height={150}>
                <LineSeries
                  id="point-burn"
                  color="#45BFB7"
                  data={dataPointBurn}
                />
                <LineSeries
                  id="point-remain"
                  color="#066493"
                  data={dataPointRemain}
                />
                <LineSeries
                  id="point-queue"
                  color="#4E4DD1"
                  data={dataPointQueue}
                />
                <XAxis position="start"/>
                <YAxis left={50}/>
              </XYPlot>
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div id="total-point">
            Total Point&nbsp;&nbsp;&nbsp;&nbsp;{totalPoint}
          </div>
          <Button id="back-button" color="primary" onClick={this.props.toggle}>
            BACK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TalentModal;
