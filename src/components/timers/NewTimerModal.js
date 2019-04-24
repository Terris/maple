import React, { Component } from 'react';
import  * as moment from 'moment';
import { Modal, Button, Icon, Form, Message } from 'semantic-ui-react';
import { db } from '../../firebase';


class NewTimerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      description: "",
      billable: false,
      time: "",
      error: null,
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.description !== "") {
      let startTime = null;
      let endTime = null;
      if (this.state.time !== "") {
        startTime = moment().format();
        endTime = moment().add(this.state.time, 'hours').format();
      }
      db.timers().push({
        project_id: this.props.project_id,
        description: this.state.description,
        start_time: startTime,
        end_time: endTime,
        billable: this.state.billable
      });
      this.setState({ description: "", billable: false, time: "", modalOpen: false });
    } else { this.setState({error: "Description can't be blank."})}
  }

  render() {
    const { description, billable, time, error } = this.state;
    return (
      <Modal
        trigger={<Button icon onClick={this.handleOpen} color="green"><Icon name="plus" /> Add Timer</Button>}
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
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default NewTimerModal;
