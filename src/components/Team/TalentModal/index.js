import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';

import { CSSTransition } from 'react-transition-group';

class TalentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioDisabled: true,
      isSubmitBtnDisabled: true,
      isInsertManually: false,
      // Form field
      fname: '',
      email: '',
      phone: '',
      status: 'notAttending',
      address: '',
      pluses: 0,
      // gender: '',
    };
    this.handleModalClosed = this.handleModalClosed.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentEditedId !== prevProps.currentEditedId) {
      const { currentEditedId, type, questions } = this.props;
      if ((currentEditedId && type === 'edit') && currentEditedId !== '') {
        const url = `/api/guest/${currentEditedId}`;
      }
    }
  }

  /**
   * Handle disable radio button
   */
  handleDisableRadioBtn() {
    const { status } = this.state;
    if (status !== 'attending') {
      this.setState({
        radioDisabled: true,
        pluses: 0,
      });
    } else if (status === 'attending') {
      this.setState({
        radioDisabled: false,
        pluses: 0,
      });
    }
  }

  /**
   * @param {Object} target Javascript Object containing react virtual dom
   */
  handleInputChange({ target }) {
    const { name, value } = target;
    // handle for extra type, its an array so need to find the exact item then update it
    if (name === 'extra') {
      const newExtra = this.state.extra.slice(0);
      const answer = newExtra.filter(extra => extra.question === target.getAttribute('question'))[0];
      answer.value = value;
      this.setState({
        [name]: newExtra
      });
    } else {
      this.setState({
        [name]: value
      }, () => {
        this.handleDisableSaveBtn();
        if (name === 'status') {
          this.handleDisableRadioBtn();
        }
      });
    }
  }


  /**
   * Adding user to database
   */

  handleModalClosed() {
    this.setState({
      fname: '',
      email: '',
      phone: '',
      status: 'notAttending',
      address: '',
      pluses: 0,
      // gender: '',
      isSubmitBtnDisabled: true,
      isInsertManually: false,
    });
  }

  handleInsertManually() {
    const { isInsertManually } = this.state;
    this.setState({
      isInsertManually: !isInsertManually,
      status: (isInsertManually) ? '' : 'notAttending',
      radioDisabled: true,
    });
  }

  render() {
    const {
      type, isOpen, toggle, className,
    } = this.props;
    const {
      fname, email, phone, pluses, address, status, extra,
      radioDisabled, isSubmitBtnDisabled, isInsertManually
    } = this.state;
    const headerTitle = type === 'edit' ? 'Edit Guest / RSVP' : 'Add Guest / RSVP';

    // Guest Create modal
    return (
      <Modal isOpen={isOpen} toggle={toggle} className={className} size="lg" onClosed={this.handleModalClosed}>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="form-guest-fname" sm={3}>Full Name</Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="fname"
                  id="form-guest-fname"
                  placeholder="Full Name"
                  value={fname}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="form-guest-email" sm={3}>Email</Label>
              <Col sm={9}>
                <Input
                  type="email"
                  name="email"
                  id="form-guest-email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={12}>
                <div id="checkbox-insert-manually">
                  <Label>
                    <Input
                      type="checkbox"
                      onChange={this.handleInsertManually}
                      checked={isInsertManually}
                    />{' '}
                    Fill RSVP questions manually for this guest
                  </Label>
                </div>
              </Col>
            </FormGroup>

            <CSSTransition
              in={(isInsertManually)}
              timeout={{ enter: 100, exit: 400 }}
              classNames="fade"
              unmountOnExit
            >
              <div>
                <FormGroup row>
                  <Label for="form-guest-phone" sm={3}>Phone</Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="phone"
                      id="form-guest-phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="form-guest-phone" sm={3}>Address</Label>
                  <Col sm={9}>
                    <Input
                      rows={3}
                      type="textarea"
                      name="address"
                      id="form-guest-phone"
                      placeholder="Address"
                      value={address}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="form-guest-status" sm={3}>Status</Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      name="status"
                      id="form-guest-status"
                      onChange={this.handleInputChange}
                      value={status || 'notAttending'}
                    >
                      <option value="attending">Attending</option>
                      <option value="notAttending">Not Attending</option>
                      <option value="pending">Pending</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="form-guest-pluses" sm={3}>Plus(es)</Label>
                  <Col sm={9}>
                    <FormGroup check inline className="selectgroup selectgroup-pills">
                      {Array.from({ length: 4 }).map((value, index) => (
                        <label
                          htmlFor={`form-guest-pluses-${index}`}
                          className="selectgroup-item"
                          key={`form-guest-pluses-${index}`}
                        >
                          <input
                            type="radio"
                            name="pluses"
                            id={`form-guest-pluses-${index}`}
                            value={index}
                            checked={(status === 'attending' && pluses.toString() === index.toString())}
                            onChange={this.handleInputChange}
                            className="selectgroup-input"
                            disabled={radioDisabled}
                          />
                          <span
                            className="selectgroup-button selectgroup-button-icon selectgroup-button-icon-text"
                          >
                            {index}
                          </span>
                        </label>
                      ))}
                    </FormGroup>
                  </Col>
                </FormGroup>
                {extra && extra.length &&
                  <FormGroup row>
                    <span>Additional Detail</span>
                  </FormGroup>
                }
                {extra && extra.map((answer, index) => (
                  <FormGroup row key={index}>
                    <Label for="form-guest-fname" sm={3}>{answer.question}</Label>
                    <Col sm={9}>
                      <Input
                        type="text"
                        name="extra"
                        placeholder={answer.question}
                        value={answer.value}
                        question={answer.question}
                        questiontype={answer.type}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  ))
                }
              </div>
            </CSSTransition>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary btn-reset" onClick={this.props.toggle}>
            <span className="btn-icon">
            </span>
            Reset Data
          </button>
          <Button className="btn-save" disabled={isSubmitBtnDisabled} onClick={this.handleSubmitBtn} >Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TalentModal;
