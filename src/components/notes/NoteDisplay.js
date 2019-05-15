import React, { Component, Fragment } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

class NoteDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    if (!!this.props.content) {
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content))) });
    } else {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }

  render() {
    const {editorState} = this.state;

    return (
        <Fragment>
          {editorState.getCurrentContent().hasText()
            ? <Editor readOnly={true} editorState={editorState} />
            : <p>Nothing here yet. Start editing to add text.</p>
          }
        </Fragment>
    );
  }
}

export default NoteDisplay;
