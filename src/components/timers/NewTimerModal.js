import React, { Component } from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react';
import { db } from '../../firebase';
import { times } from '../../helpers';

class NewTimerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      description: "",
      billable: false,
      time: "0.00",
      start: false,
      error: null,
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.description !== "") {
      db.timers().push({
        project_id: this.props.project_id,
        description: this.state.description,
        date: times.now(),
        total_time: this.state.time,
        start_time: null,
        billable: this.state.billable,
        created_at: times.now(),
      });
      this.setState({ description: "", billable: false, time: "0.00", modalOpen: false });
    } else { this.setState({error: "Description can't be blank."})}
  }

  render() {
    const { description, billable, time, error } = this.state;
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} color="green">Add New Timer</Button>}
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
        </Modal.Actions>
      </Modal>
    )
  }
}

export default NewTimerModal;
