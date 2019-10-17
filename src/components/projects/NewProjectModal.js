import React, { Component } from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';
import { db } from '../../firebase';
import { times } from '../../helpers';

class NewProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      projectName: "",
      description: "",
      error: null,
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.projectName !== "") {
      let projectKey = db.projects().push().key;
      db.project(projectKey).set({
        id: projectKey,
        name: this.state.projectName,
        description: this.state.description,
        user_id: this.props.authUser.uid,
        created_at: times.now(),
      }).then(response => {
        this.props.history.push(`${routes.PROJECTS}/${projectKey}`);
        this.setState({ modalOpen: false, projectName: "", description: "", error: null })
      });

    } else { this.setState({error: "Project name can't be blank."}) }

  }

  render() {
    const { projectName, description, error } = this.state;
    return (
      <Modal
        trigger={<Button basic onClick={this.handleOpen} icon="plus" />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon>
        <Modal.Header>New Project</Modal.Header>
        <Modal.Content>
          {error && <Message warning>{error}</Message>}
          <Form onSubmit={event => this.handleSubmit(event)}>
            <Form.Input
              fluid
              label='Project Name'
              name='projectName'
              placeholder='Project Name'
              value={projectName}
              onChange={this.handleChange}
              required
              autoComplete="off" />
            <Form.Input
              fluid
              label='Description'
              name='description'
              placeholder='Description'
              value={description}
              onChange={this.handleChange}
              autoComplete="off" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(NewProjectModal);
