import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class NoMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.state = {
      redirect: '',
    }
  }

  handleHomeClick() {
    this.setState({
      redirect: '/'
    });
  }

  render() {
    if (this.state.redirect && window.location.pathname !== this.state.redirect) {
      return (
        <Redirect to={this.state.redirect} push />
      );
    }

    return (
      <div>
        <Container>
          <Row>
            <Col sm="12">
              <div className="content-body">
                <h1>Not Found</h1>
                <p>The page that you are looking for is not here, sorry :(</p>
                <Button onClick={this.handleHomeClick} color="red" className="btn-red">Home</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NoMatch;
