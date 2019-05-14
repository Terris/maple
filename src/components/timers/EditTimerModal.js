import React, { Component } from 'react';
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

class EditTimerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      description: this.props.timer.description,
      billable: this.props.timer.billable,
      time: parseFloat(this.props.timer.total_time).toFixed(2),
      error: null,
    }
  }

  handleOpen = () => this.setState({ modalOpen: true, time: parseFloat(this.props.timer.total_time).toFixed(2) })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.description !== "") {
      db.timer(this.props.timer.id).set({
        ...this.props.timer,
        description: this.state.description,
        total_time: this.state.time,
        billable: this.state.billable,
        updated_at: times.now(),
      });
      this.setState({ modalOpen: false });
    } else { this.setState({error: "Description can't be blank."})}
  }

  handleDelete = () => {
    if( window.confirm("Are you sure?") ) {
      db.timer(this.props.timer.id).remove();
    }
  }

  render() {
    const { description, billable, time, error } = this.state;
    return (
      <Modal
        trigger={<Button icon onClick={this.handleOpen}><Icon name="edit" /></Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon>
        <Modal.Header>New Timer</Modal.Header>
        <Modal.Content>
          {error && <Message warning>{error}</Message>}
          <Form onSubmit={event => this.handleSubmit(event)}>
            <Form.Input
              fluid
              label='Description'
              name='description'
              placeholder='Description'
              value={description}
              onChange={this.handleChange}
              autoComplete="off" />
            <Form.Checkbox
              label='Billable'
              value='billable'
              checked={billable}
              onChange={() => this.setState({ billable: billable ? false : true })} />
            <Form.Input
              type='number'
              label='Time'
              name='time'
              placeholder='0.00'
              value={time}
              onChange={this.handleChange}
              autoComplete='off' />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit}>Save</Button>
          <Button onClick={this.handleDelete} icon="trash" color="red" />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditTimerModal;
