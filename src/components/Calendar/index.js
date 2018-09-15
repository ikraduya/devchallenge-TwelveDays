import React from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import RcCalendar from 'rc-calendar';
import { UniversalStyle as Style } from 'react-css-component';
import moment, { months } from 'moment';

import { MdLocationOn } from 'react-icons/md/index';

import 'rc-calendar/assets/index.css';
import './index.css';

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [
        { 
          time:'15/09/2018 17:00:00',
          notes: 'Bertemu dengan Pak Rudi di Bandara Halim membawa dokumen terkait projek.',
          location: 'Bandara Halim Kusuma',
          eventCount: 1,
        },
        { 
          time:'17/09/2018 11:00:00',
          notes: 'Bertemu dengan Pak Rudi di Bandara Halim membawa dokumen terkait projek.',
          location: 'Bandara Halim Kusuma',
          eventCount: 4,
        },
      ],
      selectedDate: moment(),
      editedNotes: '',
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSaveNotesClick = this.handleSaveNotesClick.bind(this);
    this.createBadge = this.createBadge.bind(this);
    this.renderEventList = this.renderEventList.bind(this);
  }

  componentDidMount() {
    const { selectedDate, eventList } = this.state;
    const eventIdx = eventList.findIndex((eventElmt) => (selectedDate.isSame(moment(eventElmt.time, "DD/MM/YYYY HH:mm:ss"), 'day')));
    this.setState({
      editedNotes: (eventIdx !== -1) ? eventList[eventIdx].notes : '',
    })
  }

  handleSelect(event) {
    this.setState({
      selectedDate: moment(event._d),
    }, () => {
      const { selectedDate, eventList } = this.state;

      const eventIdx = eventList.findIndex((eventElmt) => (selectedDate.isSame(moment(eventElmt.time, "DD/MM/YYYY HH:mm:ss"), 'day')));
      this.setState({
        editedNotes: (eventIdx !== -1) ? eventList[eventIdx].notes : '',
      })
    });
  }

  handleNotesChange(event) {
    this.setState({
      editedNotes: event.target.value,
    });
  }

  handleSaveNotesClick() {
    const { selectedDate, eventList, editedNotes } =  this.state;

    const eventIdx = eventList.findIndex((event) => (selectedDate.isSame(moment(event.time, "DD/MM/YYYY HH:mm:ss"), 'day')));
    if (eventIdx !== -1) {
      eventList[eventIdx].notes = editedNotes;
      this.setState({
        eventList: [...eventList],
      });
    } else {
      const newEvent = {
        time: selectedDate.format('DD/MM/YYYY HH:mm:ss'),
        notes: editedNotes,
        location: '',
        eventCount: 1,
      };
      this.setState({
        eventList: [...eventList, newEvent],
      });
    }
  }

  createBadge() {
    const { eventList, selectedDate } = this.state;
    
    let dateSelector = '';
    let dateContentSelector = '';
    let formattedDate;
    for (let i=0; i<eventList.length; i += 1) {
      formattedDate = moment(eventList[i].time, "DD/MM/YYYY HH:mm:ss").format('MMMM D, YYYY');
      dateSelector += `[title="${formattedDate}"] .rc-calendar-date`;
      if (i < eventList.length - 1) {
        dateSelector += ',';
      }
      dateSelector += ` `;
      
      dateContentSelector += `
      [title="${formattedDate}"] .rc-calendar-date:after {
        content: "${eventList[i].eventCount}";
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
    const mappedEvent = eventList ? eventList.sort((left, right) => (moment(left.time, "DD/MM/YYYY HH:mm:ss").diff(moment(right.time, "DD/MM/YYYY HH:mm:ss"))))
      .map((event, index) => {
        const { time, notes, location, eventCount } = event;
        const momentedTime = moment(time, "DD/MM/YYYY HH:mm:ss");
        const diffInMinute = moment.duration(momentedTime.diff(moment())).asMinutes();

        const inMinute = ((diffInMinute <= 60) && (diffInMinute >= 0)) ? `In ${Math.floor(diffInMinute)} min` : '';

        const formattedDate = momentedTime.format("DD");
        const formattedMonth = momentedTime.format("MM");
        const formattedHour = momentedTime.format("h:mm A");

        const isToday = selectedDate.isSame(momentedTime, 'day');
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
                <Button color="link" className="see-more-btn">
                  SEE MORE
                </Button>
              </div>
            </Col>
          </Row>
        );
        return;
      }) : '';
    return mappedEvent;
  }

  render() {
    const css = this.createBadge();
    const { selectedDate, editedNotes } = this.state;editedNotes

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
                onChange={this.handleSelect}
                showDateInput={false}
                showToday={false}
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
