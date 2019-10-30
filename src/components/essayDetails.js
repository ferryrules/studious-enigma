import React, {Fragment} from 'react'
import EditPrompt from './editPrompts.js'
import NoteOrInstructions from './noteOrInstructions.js'
import { Accordion, Icon, Header, Grid, Segment } from 'semantic-ui-react'

export default function EssayDetails(props) {
  const { type, prompt, activeIndex, handleClick } = props

  const eachPrompt = (d) => {
    return d['prompts'].map(p=>{
      return (
        <EditPrompt prompt={p['prompt']} key={p['name']+p['prompt']}/>
      )
    })
  }

  const noteOrInstructions = (d) => {
    return <NoteOrInstructions text={d['instructions']} />
  }

  const eachDetail = prompt.map(d=>{
    return (
      <Accordion.Content active={activeIndex === 0} key={d['name']}>
        <Segment>
          <Grid fluid="true" textAlign='left' divided>
            {noteOrInstructions(d)}
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
                <h5>PROMPTS</h5>
                {eachPrompt(d)}
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>
      </Accordion.Content>
    )
  })

  return (
    <Fragment>
      { eachDetail.length > 0 ?
        (<Accordion fluid styled>
          <Accordion.Title
            active={activeIndex===0}
            index={0}
            onClick={(e, titleProps)=>{handleClick(e, titleProps, prompt)}}>
            <Grid>
              <Grid.Column textAlign='left' width={8}>
                <Header as='h3'>
                  <Icon name='dropdown' />
                   {type}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='right' width={8}>
                <Header as='h5'>
                  {prompt.length} { prompt.length === 1 ? 'Essay' : 'Essays' }
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
