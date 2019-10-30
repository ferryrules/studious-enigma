import React, {Fragment} from 'react'
import EditPrompt from './editPrompts.js'
import NoteOrInstructions from './noteOrInstructions.js'
import { Accordion, Icon, Grid, Header } from 'semantic-ui-react'

export default function ProgramDetails(props) {
  const { program, activeIndex, handleClick } = props

  const eachPrompt = (ps) => {
    return ps['prompts'].map(p=>{
      return (
        <EditPrompt prompt={p['prompt']} key={p['prompt']}/>
      )
    })
  }

  const eachEssay = program['supplements'].map(ps=>{
    return (
      <Fragment key={ps['name']}>
        <Grid.Column width={4}>
          <Grid.Row>
            <h5>DETAILS</h5>
            Max Length: {ps['display_length']}
            <br />
            { ps['topic'] ? `Topic: ${ps['topic']}` : null }
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid.Row>
            <h5>PROMPTS</h5>
            {eachPrompt(ps)}
          </Grid.Row>
        </Grid.Column>
      </Fragment>
    )
  })

  return (
    <Fragment>
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex===0}
          index={0}
          onClick={(e, titleProps)=>{handleClick(e, titleProps, program)}}>
          <Grid>
            <Grid.Column textAlign='left' width={8}>
              <Header as='h3'>
                <Icon name='dropdown' />
                 {program['name']}
              </Header>
            </Grid.Column>
            <Grid.Column textAlign='right' width={8}>
              <Header as='h5'>
                {program['supplements'].length} { program['supplements'].length === 1 ? 'Essay' : 'Essays' }
              </Header>
            </Grid.Column>
          </Grid>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Grid fluid="true" textAlign='left' divided>
            <NoteOrInstructions text={program['instructions']} />
            <Grid.Row></Grid.Row>
            {eachEssay}
          </Grid>
        </Accordion.Content>
      </Accordion>
    </Fragment>
  )
}
