import React, { Component } from 'react';
import { Container, Form, Button, Message, Divider } from 'semantic-ui-react';
import { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password === this.state.passwordConfirmation) {
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => this.props.history.push(routes.PROJECTS))
      .catch(error => this.setState({ error: error.message }))
    } else {
      this.setState({ error: "Passwords do not match." })
    }
  }

  signInWithGoogle = () => {
    auth.signInWithGoogle()
    .then(() => this.props.history.push(routes.PROJECTS))
    .catch(error => this.setState({error: error.messsage}))
  }

  render() {
    const {email, password, passwordConfirmation, error} = this.state;
    return (
      <Container text style={{ width: '320px' }}>
        <h1>Sign Up</h1>
        {error && <Message warning>{error}</Message>}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label='Email'
            name="email"
            placeholder='Email'
            value={email}
            onChange={this.handleChange} />
          <Form.Input
            fluid
            type="password"
            label='Password'
            name="password"
            placeholder='Password'
            value={password}
            onChange={this.handleChange} />
          <Form.Input
            fluid
            type="password"
            label='Confirm Password'
            name="passwordConfirmation"
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={this.handleChange} />
          <Button type='submit'>Submit</Button>
        </Form>
        <Divider horizontal section>Or</Divider>
        <Button
          fluid
          icon="google"
          labelPosition='left'
          color="blue"
          type='button'
          onClick={this.signInWithGoogle}
          content="Sign Up with Google" />
      </Container>
    )
  }
}

export default withRouter(SignUp);
