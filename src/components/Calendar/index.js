import React from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import RcCalendar from 'rc-calendar';
import { UniversalStyle as Style } from 'react-css-component';
import moment, { months } from 'moment';
import axios from 'axios';

import { MdLocationOn, MdAccessTime, MdList } from 'react-icons/md/index';

import 'rc-calendar/assets/index.css';
import './index.css';

const timeFormat = 'DD/MM/YYYY HH:mm:ss';
const dateFormat = 'DD/MM/YYYY';
class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      selectedDate: moment(),
      editedNotes: '',
      editedLocation: '',
      editedTime: '07:00',
      editedIndex: '',
    }
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleClickEventList = this.handleClickEventList.bind(this);
    this.changeNotesDayEdit = this.changeNotesDayEdit.bind(this);

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);

    this.handleSaveNotesClick = this.handleSaveNotesClick.bind(this);
    this.createBadge = this.createBadge.bind(this);
    this.renderEventList = this.renderEventList.bind(this);
    this.renderNotesIndexOption = this.renderNotesIndexOption.bind(this);
  }

  componentDidMount() {
    // fetch data
    axios.get('/api/calendar/events')
      .then(({ data: res }) => {
        if (res.status === 'success') {
          this.setState({
            eventList: res.data,
          }, () => {
            const { selectedDate, eventList } = this.state;
            const eventIdx = eventList.findIndex((eventElmt) => (selectedDate.isSame(moment(eventElmt.date, dateFormat), 'day')));
            
            let editedNotes = '', editedLocation = '', editedTime = '07:00', editedIndex = '';
            if (eventIdx !== -1) {
              if (eventList[eventIdx].notesList.length > 0) {
                editedNotes = eventList[eventIdx].notesList[0].notes;
                editedLocation = eventList[eventIdx].notesList[0].location;
                editedTime = eventList[eventIdx].notesList[0].time;
                editedIndex = 1;
              }
            }
            
            this.setState({
              editedNotes,
              editedLocation,
              editedTime,
              editedIndex,
            })
          })
        }
      })
  }

  handleSelectDate(event) {
    this.setState({
      selectedDate: moment(event),
    }, () => {
      this.changeNotesDayEdit();
    });
  }

  handleClickEventList(time) {
    this.setState({
      selectedDate: moment(time, 'DD/MM/YYYY'),
    }, () => {
      this.changeNotesDayEdit();
    })
  }

  changeNotesDayEdit() {
    const { selectedDate, eventList } = this.state;
    const eventIdx = eventList.findIndex((eventElmt) => (selectedDate.isSame(moment(eventElmt.date, dateFormat), 'day')));
    let editedNotes = '', editedLocation = '', editedTime = '07:00', editedIndex = '';
    if (eventIdx !== -1) {
      if (eventList[eventIdx].notesList.length > 0) {
        editedNotes = eventList[eventIdx].notesList[0].notes;
        editedLocation = eventList[eventIdx].notesList[0].location;
        editedTime = moment(eventList[eventIdx].notesList[0].time, 'HH:mm:ss').format('HH:mm');
        editedIndex = 1;
      }
    }

    this.setState({
      editedNotes,
      editedLocation,
      editedTime,
      editedIndex,
    })
  }

  handleNotesChange(event) {
    this.setState({
      editedNotes: event.target.value,
    });
  }

  handleLocationChange(event) {
    this.setState({
      editedLocation: event.target.value,
    });
  }

  handleTimeChange(event) {
    this.setState({
      editedTime: event.target.value,
    });
  }

  handleIndexChange(event) {
    const { selectedDate, eventList } = this.state;

    const eventIdx = eventList.findIndex((event) => (selectedDate.isSame(moment(event.date, dateFormat), 'day')));
    const idx = event.target.value - 1;
    const { notes: editedNotes, location: editedLocation, time: editedTime } = this.state.eventList[eventIdx].notesList[idx];
    this.setState({
      editedNotes,
      editedLocation,
      editedTime,
      editedIndex: event.target.value,
    })
  }

  handleSaveNotesClick() {
    const { selectedDate, eventList, editedNotes, editedLocation, editedTime, editedIndex } =  this.state;

    const eventIdx = eventList.findIndex((event) => (selectedDate.isSame(moment(event.date, dateFormat), 'day')));
    const momentedDate = moment(selectedDate, dateFormat);
    const momentedTime = moment(editedTime ,'HH:mm:ss');
    const settedTime = {
      'hour': momentedTime.get('hour'),
      'minute': momentedTime.get('minute'),
      'second': momentedTime.get('second'),
    };
    
    if (eventIdx !== -1) {
      eventList[eventIdx].notesList[editedIndex-1].notes = editedNotes;
      eventList[eventIdx].notesList[editedIndex-1].location = editedLocation;
      eventList[eventIdx].notesList[editedIndex-1].time = editedTime;
      this.setState({
        eventList: [...eventList],
      }, () => {
        const eventId = eventList[eventIdx].notesList[editedIndex-1].id;
        axios.post('/api/calendar/events/update', {
          eventId,
          time: momentedDate.set(settedTime),
          notes: editedNotes,
          location: editedLocation,
        })
      });
    } else {
      const newEvent = {
        date: selectedDate.format('DD/MM/YYYY'),
        notesList: [
          {
            notes: editedNotes,
            location: editedLocation,
            time: editedTime,
          }
        ],
      };
      axios.post('/api/calendar/events/create', {
        time: momentedDate.set(settedTime),
        notes: editedNotes,
        location: editedLocation,
      })
        .then(({ data: res }) => {
          newEvent.notesList[0].id = res.data._id;
          this.setState({
            eventList: [...eventList, newEvent],
          });
        })
    }
  }

  createBadge() {
    const { eventList, selectedDate } = this.state;
    
    let dateSelector = '';
    let dateContentSelector = '';
    let formattedDate;
    for (let i=0; i<eventList.length; i += 1) {
      formattedDate = moment(eventList[i].date, dateFormat).format('MMMM D, YYYY');
      dateSelector += `[title="${formattedDate}"] .rc-calendar-date`;
      if (i < eventList.length - 1) {
        dateSelector += ',';
      }
      dateSelector += ` `;
      
      dateContentSelector += `
      [title="${formattedDate}"] .rc-calendar-date:after {
        content: "${(eventList[i].notesList) ? eventList[i].notesList.length : 0}";
      }

    `;
    }
    return (
      `
        ${dateSelector}{
          position:relative;
        }

        [title="${selectedDate.format("ddd")}"] {
          color: #3fc7fa;
        }

        ${dateContentSelector}
      `
    );
  }

  renderEventList() {
    const { eventList, selectedDate } = this.state;
    const mappedEvent = eventList ? eventList.sort((left, right) => (moment(left.date, dateFormat).diff(moment(right.date, dateFormat))))
      .map((event, index) => {
        let { date, notesList } = event;
        let eventCount = notesList.length;

        if (eventCount > 0) {
          let { time, notes, location } = notesList[0];
          let momentedDate = moment(date, dateFormat);
          let momentedTime = moment(time, 'HH:mm:dd');
          let diffInMinute = moment.duration(momentedTime.diff(moment())).asMinutes();
  
          let inMinute = ((diffInMinute <= 60) && (diffInMinute >= 0)) ? `In ${Math.floor(diffInMinute)} min` : '';
  
          let formattedDate = momentedDate.format("DD");
          let formattedMonth = momentedDate.format("MM");
          let formattedHour = momentedTime.format("h:mm A");
  
          let isToday = selectedDate.isSame(moment(date, dateFormat), 'day');
          return (
            <Row className="event-desc" key={index} style={{ color: isToday ? 'initial' : '#bbb' }}>
              <Col md="3">
                <div className="minute-notif">
                  {inMinute}
                </div>
                <div className="date-desc">
                  <div className="notif-count">
                    {eventCount}
                  </div>
                  <div>
                    <div className="date">
                      {formattedDate}
                    </div>
                    <div className="month">
                      {formattedMonth}
                    </div>
                    <div className="hour">
                      {formattedHour}
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="notes-desc" md="9">
                <div className="notes-body">
                  {notes}
                </div>
                <div className="notes-footer">
                  <div className="location">
                    <div className="icon" style={{ color: isToday ? '' : '#bbb' }}>
                      <MdLocationOn />
                    </div>
                    {location}
                  </div>
                  <Button color="link" className="see-more-btn"  onClick={() => this.handleClickEventList(momentedDate)}>
                    SEE MORE
                  </Button>
                </div>
              </Col>
            </Row>
          );
        }
        return;
      }) : '';
    return mappedEvent;
  }

  renderNotesIndexOption() {
    const { selectedDate, eventList } = this.state;
   
    const selectedDateEventIdx = eventList.findIndex((eventElmt) => (selectedDate.isSame(moment(eventElmt.date, dateFormat), 'day')));
    const mappedOption = ((selectedDateEventIdx !== -1) && eventList[selectedDateEventIdx].notesList) ? eventList[selectedDateEventIdx].notesList
      .map((note, index) => (<option key={index}>{index+1}</option>)) : (<option>1</option>);

    return mappedOption;
  }

  render() {
    const css = this.createBadge();
    const { selectedDate, editedNotes, editedLocation, editedTime, editedIndex } = this.state;

    return (
      <div id="calendar-page">
        <Style css={css} />
        <Row>
          <Col md="6">
            <Col id="date-card" md="12">
              <div id="card-title">
                Date
              </div>
              <RcCalendar
                onChange={this.handleSelectDate}
                showDateInput={false}
                showToday={false}
                value={selectedDate}
              />
            </Col>
          </Col>
          <Col md="6">
            <Col id="notes-and-event-card" md="12">
              <Row>
                <Col id="notes" md="12">
                  <div id="notes-title">
                    {selectedDate.format("dddd, D MMMM YYYY")}
                    <Button color="primary" onClick={this.handleSaveNotesClick}>SAVE</Button>
                  </div>
                  <div id="notes-input">
                    <Input
                      type="textarea"
                      id="notes-input-text-area"
                      onChange={this.handleNotesChange}
                      placeholder="Klik untuk menulis notes..."
                      value={editedNotes}
                    />
                    <div className="notes-detail">
                      <div className="detail-col">
                        <MdLocationOn style={{marginRight: "6px", color: "#71C5EF", fontSize: "20px"}}/>
                        <Input className="location-input" type="text" placeholder="Location" onChange={this.handleLocationChange} value={editedLocation}/>
                      </div>
                      <div className="detail-col" style={{marginLeft: "10px"}}>
                        <MdAccessTime style={{marginRight: "6px", color: "#71C5EF", fontSize: "20px"}}/>
                        <Input className="time-input" type="time" placeholder="Time" onChange={this.handleTimeChange} value={editedTime} />
                      </div>
                      <div className="detail-col" style={{marginLeft: "10px"}}>
                        <MdList style={{marginRight: "6px", color: "#71C5EF", fontSize: "20px"}}/>
                        <Input className="index-input" type="select" value={editedIndex} onChange={this.handleIndexChange}>
                          {this.renderNotesIndexOption()}
                        </Input>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col id="event" md="12">
                  <div id="event-title">
                    Event
                  </div>
                  <Container>
                    {this.renderEventList()}
                  </Container>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Calendar;
