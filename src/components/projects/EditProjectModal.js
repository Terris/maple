import React, { Component } from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

class EditProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      projectName: this.props.project.name,
      description: this.props.project.description,
      error: null,
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.projectName !== "") {
      db.project(this.props.project.id).set({
        ...this.props.project,
        name: this.state.projectName,
        description: this.state.description,
        updated_at: times.now(),
      })
      this.setState({ modalOpen: false });
    } else { this.setState({error: "Project name can't be blank."}) }

  }

  handleDelete = () => {
    if( window.confirm("Are you sure?") ) {
      db.project(this.props.project.id).remove();
    }
  }

  render() {
    const { projectName, description, error } = this.state;
    return (
      <Modal
        trigger={<Button floated="right" icon="setting" size="mini" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon>
        <Modal.Header>Edit Project</Modal.Header>
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
          <Button onClick={this.handleSubmit} color="blue">Submit</Button>
          <Button onClick={this.handleDelete} color="red" content="Delete Project" />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditProjectModal;
