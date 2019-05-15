import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {

  }
  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Permissions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Terris Kremer</Table.Cell>
            <Table.Cell>Project Owner</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Sadie Hunsinger</Table.Cell>
            <Table.Cell>Collaborator</Table.Cell>
            <Table.Cell><Button size='mini' color='red' icon='delete' /></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

export default People;
