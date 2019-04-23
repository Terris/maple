import React, { Component } from 'react';
import { Form, Button, Grid, Message, Divider, Icon } from 'semantic-ui-react';
import { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    auth.signInWithEmailandPassword(this.state.email, this.state.password)
    .then(response => {
      console.log(response);
      this.props.history.push(routes.DASHBOARD)
    })
    .catch(error => this.setState({ error: error.message }))
  }

  signInWithGoogle = () => {
    auth.signInWithGoogle()
    .then(() => this.props.history.push(routes.DASHBOARD))
    .catch(error => this.setState({error: error.messsage}))
  }

  render() {
    const {email, password, error} = this.state;
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <h1>Sign In</h1>
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
            <Button type='submit'>Submit</Button>
          </Form>
          <Divider section />
          <Button
            fluid
            icon
            labelPosition='left'
            color="blue"
            type='button'
            onClick={this.signInWithGoogle}>
            Sign In with Google
            <Icon name='google' />
          </Button>
        </Grid.Column>
      </Grid>

    )
  }
}

export default withRouter(SignUp);
