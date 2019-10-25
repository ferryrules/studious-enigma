import React, {useState, Fragment} from 'react'
import { Accordion, Icon, Header, Grid, Container, Segment, Button, Form, TextArea } from 'semantic-ui-react'

export default function EssayDetails(props) {
  const { prompt } = props
  const [editPrompt, setEditPrompt] = useState(false)
  const [newPrompt, setNewPrompt] = useState([prompt])

  // console.log(prompt);
  console.log(newPrompt);
  return (
    <Fragment>
      { editPrompt ? (
        <Form>
          <TextArea fluid value={newPrompt} onChange={(e)=>{setNewPrompt(e.target.value)}} />
        </Form>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: newPrompt}} />
      )}
      <Button onClick={()=>{setEditPrompt(!editPrompt)}}>{editPrompt ? 'Save' : 'Edit'}</Button>
      <br />
    </Fragment>
  )
}