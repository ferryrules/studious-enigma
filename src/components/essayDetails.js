import React, {useState, Fragment} from 'react'
import EditPrompt from './editPrompts.js'
import { Accordion, Icon, Header, Grid, Container, Segment, Button, Input } from 'semantic-ui-react'

export default function EssayDetails(props) {
  const { essay, details } = props
  const [activeIndex, setActiveIndex] = useState(1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const eachDetail = details.map(d=>{
    const eachPrompt = d['prompts'].map(p=>{
      return (
        <EditPrompt prompt={p['prompt']} />
      )
    })
    const noteOrInstructions = () => {
      if (d['instructions'] === "<p>Note: This prompt only appears after the application fee is paid.</p>") {
        return (
          <Fragment>
            <Grid.Column width={16}>
              <i><div dangerouslySetInnerHTML={{ __html: d['instructions']}} /></i>
            </Grid.Column>
          </Fragment>
        )
      }
      if (d['instructions']) {
        let instruct = (d['instructions'].startsWith('<p>')) ?
          <Grid.Row dangerouslySetInnerHTML={{ __html: d['instructions']}} />
        :
          <Grid.Row>{d['instructions']}</Grid.Row>
        return (
          <Grid>
            <b>INSTRUCTIONS: </b>
            <br />
            <br />
            <Container textAlign='left'>{instruct}</Container>
          </Grid>
        )
      }
    }
    return (
      <Accordion.Content active={activeIndex === 0}>
      <Segment>
        <Grid fluid textAlign='left'>
          {noteOrInstructions()}
          <Grid.Row></Grid.Row>
          <Grid.Column width={4}>
            <Grid.Row>
              <h5>DETAILS</h5>
              Max Length: {d['display_length']}
              <br />
              { d['topic'] ? `Topic: ${d['topic']}` : null }
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              {d['prompts'].length > 0 ? (
                <Fragment>
                  <h5>PROMPTS</h5>
                  {eachPrompt}
                </Fragment>
              ) : null }
            </Grid.Row>
          </Grid.Column>
        </Grid>
        </Segment>
      </Accordion.Content>
    )
  })

  return (
    <Fragment textAlign='center'>
      { eachDetail.length > 0 ?
        (<Accordion fluid styled>
          <Accordion.Title
            active={activeIndex===0}
            index={0}
            onClick={handleClick}>
            <Grid>
              <Grid.Column textAlign='left' width={8}>
                <Header as='h3'>
                  <Icon name='dropdown' />
                   {essay}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='right' width={8}>
                <Header as='h5'>
                  {details.length} { details.length === 1 ? 'Essay' : 'Essays' }
                </Header>
              </Grid.Column>
            </Grid>
          </Accordion.Title>
          {eachDetail}
        </Accordion>)
        : null }
    </Fragment>
  )
}
