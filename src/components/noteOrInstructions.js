import React, { Fragment } from 'react'
import { Grid, Container } from 'semantic-ui-react'

export default function NoteOrInstructions(props) {
  const { text } = props

  const note = () => {
    if (text === '<p>Note: This prompt only appears after the application fee is paid.</p>') {
      return (
        <Fragment>
          <Grid.Column width={16}>
            <i><div dangerouslySetInnerHTML={{ __html: text}} /></i>
          </Grid.Column>
        </Fragment>
      )
    }
  }

  const instruct = () => {
    if (text) {
      let instruct = (text.startsWith('<p>')) ?
      <Grid.Row dangerouslySetInnerHTML={{ __html: text}} />
      :
      <Grid.Row>{text}</Grid.Row>
      return (
        <Grid>
          <b>INSTRUCTIONS: </b>
          <br />
          <Container textAlign='left'>{instruct}</Container>
        </Grid>
      )
    }
  }

  return (
    <Fragment>
      {note() ? note() : instruct()}
    </Fragment>
  )
}
