import React, { Component, Fragment } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { db } from '../../firebase';
import { mapped } from '../../helpers';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notes: [],
      error: null,
    }
  }

  componentDidMount() {
    this.onListenForNotes();
  }

  onListenForNotes = () => {
    this.setState({ loading: true });
    db.notes()
      .orderByChild('project_id')
      .equalTo(this.props.project_id)
      .on('value', snapshot => this.setState({ timers: mapped.withId(snapshot.val()), loading: false }))
  }

  componentWillUnmount() {
    db.notes().off();
  }

  render() {
    const { notes } = this.state;
    return (
      <Fragment>
        {!notes.length &&
          <Segment placeholder>
            <Header icon>
              Add your first note.
            </Header>
            <Segment.Inline>
              <Button color="green">Add New Note</Button>
            </Segment.Inline>
          </Segment>
        }
      </Fragment>
    )
  }
}

export default Notes;
