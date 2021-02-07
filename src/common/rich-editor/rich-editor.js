import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';

export const RichEditor = props => {
  const { onChange, onBlur, value } = props;

  const editorState = typeof value === 'string' ? EditorState.createWithContent(stateFromHTML(value)) : value;

  return <Editor editorState={editorState} onEditorStateChange={onChange} onBlur={onBlur} />;
};
