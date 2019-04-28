import React, { Fragment } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import NoteEditor from './NoteEditor';

const Note = ({ note }) => {
  return (
    <Fragment>
      <Header as='h3' attached='top'>
        {note.title}
      </Header>
      <Segment attached>
        {note.content}
      </Segment>
    </Fragment>
  )
}

export default Note;
