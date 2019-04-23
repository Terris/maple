import React, { Component } from 'react';
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react';
import { db } from '../../firebase';

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
      db.projects().push({
        name: this.state.projectName,
        description: this.state.description,
        user_id: this.props.authUser.uid
      });
      this.setState({ projectName: "", description: "", modalOpen: false });
    } else { this.setState({error: "Project name can't be blank."}) }

  }

  render() {
    const { projectName, description, error } = this.state;
    return (
      <Modal
        trigger={<Button icon onClick={this.handleOpen}><Icon name="plus" /></Button>}
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

export default NewProjectModal;
