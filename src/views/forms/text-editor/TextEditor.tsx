// ** React Imports
// ** Third Party Imports
import { EditorState } from 'draft-js'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from '../../../@core/styles/libs/react-draft-wysiwyg'
import { EditorProps } from 'react-draft-wysiwyg'

interface TextEditorProps {
  disabled?: boolean
  placeholder?: string
  editorState?: EditorState
  onEditorStateChange?: (data: EditorState) => void
}

const TextEditor = (props: TextEditorProps & EditorProps) => {
  return (
    <EditorWrapper>
      <ReactDraftWysiwyg {...props}  />
    </EditorWrapper>
  )
}

export default TextEditor
