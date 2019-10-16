import React, { Component, Fragment } from 'react';
import { Segment, Header, Message, Loader, Divider } from 'semantic-ui-react';
import { db } from '../../firebase';
import { mapped } from '../../helpers';
import NewNoteModal from './NewNoteModal';
import EditNoteModal from './EditNoteModal';
import Note from './Note';

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
      .on('value', snapshot => this.setState({ notes: mapped.withId(snapshot.val()), loading: false }))
  }

  componentWillUnmount() {
    db.notes().off();
  }

  render() {
    const { notes, error, loading } = this.state;
    return (
      <Fragment>
        {error && <Message warning>{error}</Message>}
        {loading && <Loader active />}
        {notes && <Segment><NewNoteModal project_id={this.props.project_id} /></Segment> }
        {!notes.length &&
          <Segment placeholder>
            <Header icon>
              Add your first note.
            </Header>
            <Segment.Inline>
              <NewNoteModal project_id={this.props.project_id} />
            </Segment.Inline>
          </Segment>
        }
        {notes && notes.reverse().map(note => {
          return (
            <Segment key={note.id}>
              <h3 className="ui left floated header">{note.title}</h3>
              <EditNoteModal note={note} />
              <Divider clearing />
              <Note note={note} />
            </Segment>
          )
        })}
      </Fragment>
    )
  }
}

export default Notes;
