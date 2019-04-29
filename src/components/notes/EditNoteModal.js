import React, { Component } from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

class EditNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      title: this.props.note.title,
      error: null,
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.title !== "") {
      db.note(this.props.note.id).set({
        ...this.props.note,
        title: this.state.title,
        updated_at: times.now(),
      });
      this.setState({ title: "", modalOpen: false });
    } else { this.setState({error: "Note name can't be blank."}) }

  }

  handleDelete = () => {
    if( window.confirm("Are you sure?") ) {
      db.note(this.props.note.id).remove();
    }
  }

  render() {
    const { title, error } = this.state;
    return (
      <Modal
        trigger={<Button floated="right" icon="setting" size="mini" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon>
        <Modal.Header>Edit Note</Modal.Header>
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
          <Button color="green" onClick={this.handleSubmit} content="Submit" />
          <Button onClick={this.handleDelete} color="red" content="Delete Note" />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditNoteModal;
