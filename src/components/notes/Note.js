import React, { Fragment, useState } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import NoteDisplay from './NoteDisplay';
import NoteEditor from './NoteEditor';
import { db } from '../../firebase';

const Note = ({ note }) => {
  const [editing, setEditing] = useState(false);

  const handleSave = (rawContent) => {
    db.note(note.id).set({
      ...note,
      content: rawContent,
    }).then(() => setEditing(false) );
  }

  return (
    <Fragment>
      {editing
        ? (
            <Fragment>
              <NoteEditor content={note.content} onSave={(rawContent) => handleSave(rawContent)} />
            </Fragment>
        ) : (
          <Fragment>
            <NoteDisplay content={note.content} />
            <Divider />
            <Button icon="pencil" size="mini" onClick={() => setEditing(true)} />
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Note;
