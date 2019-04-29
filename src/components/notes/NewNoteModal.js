import React, { Component } from 'react';
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react';
import { db } from '../../firebase';

class NewNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      title: "",
      error: null,
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.title !== "") {
      db.notes().push({
        project_id: this.props.project_id,
        title: this.state.title,
      });
      this.setState({ title: "", modalOpen: false });
    } else { this.setState({error: "Note name can't be blank."}) }

  }

  render() {
    const { title, error } = this.state;
    return (
      <Modal
        trigger={<Button color="green" icon onClick={this.handleOpen}><Icon name="plus" /> Add Note</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon>
        <Modal.Header>New Note</Modal.Header>
        <Modal.Content>
          {error && <Message warning>{error}</Message>}
          <Form onSubmit={event => this.handleSubmit(event)}>
            <Form.Input
              fluid
              label='Note Title'
              name='title'
              placeholder='Note Title'
              value={title}
              onChange={this.handleChange}
              required
              autoComplete="off" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleSubmit}>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default NewNoteModal;
