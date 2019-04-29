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
          <Editor readOnly={true} editorState={editorState} />
        </Fragment>
    );
  }
}

export default NoteDisplay;
