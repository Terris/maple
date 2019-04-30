import React, { Component } from 'react';
import { Container, Form, Button, Message, } from 'semantic-ui-react';
import { auth } from '../../firebase';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      submitted: false
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    auth.sendPasswordResetEmail(this.state.email)
    .then(response => {
      this.setState({ submitted: true})
    })
    .catch(error => this.setState({ error: error.message }))
  }

  render() {
    const {email, submitted, error} = this.state;
    return (
      <Container text style={{ width: '320px'}}>
        <h1>Forgot Password</h1>
        {error && <Message warning>{error}</Message>}
        {submitted
          ? (
            <p>Thank you. Instructions have been sent to the email you provided.</p>
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <p>Enter your email and we'll send you instrucitons for restting your password.</p>
              <Form.Input
                fluid
                label='Email'
                name="email"
                placeholder='Email'
                value={email}
                onChange={this.handleChange} />
              <Button type='submit'>Submit</Button>
            </Form>
          )
        }
      </Container>
    )
  }
}

export default ForgotPassword;
