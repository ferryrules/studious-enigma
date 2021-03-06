import React, {useState, Fragment} from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'

export default function EssayDetails(props) {
  const { prompt } = props
  const [editPrompt, setEditPrompt] = useState(false)
  const [newPrompt, setNewPrompt] = useState([prompt])
  
  return (
    <Fragment>
      { editPrompt ? (
        <Form>
          <TextArea fluid="true" value={newPrompt} onChange={(e)=>{setNewPrompt(e.target.value)}} />
          <Button onClick={()=>{setEditPrompt(false)}}>Save</Button>
        </Form>
      ) : (
        <div onClick={()=>{setEditPrompt(true)}} dangerouslySetInnerHTML={{ __html: newPrompt}} />
      )}
      <br />
    </Fragment>
  )
}
