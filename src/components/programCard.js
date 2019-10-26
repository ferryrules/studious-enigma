import React, {useState, Fragment} from 'react'
import EditPrompt from './editPrompts.js'
import NoteOrInstructions from './noteOrInstructions.js'
import { Accordion, Icon, Grid, Header } from 'semantic-ui-react'

export default function SuppCards(props) {
  const { program } = props
  const [activeIndex, setActiveIndex] = useState(1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const eachEssay = program['supplements'].map(ps=>{
    const eachPrompt = ps['prompts'].map(p=>{
      return (
        <EditPrompt prompt={p['prompt']} />
      )
    })
    return (
      <Fragment>
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
            {eachPrompt}
          </Grid.Row>
        </Grid.Column>
      </Fragment>
    )
  })

  return (
    <Fragment textAlign='center'>
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex===0}
          index={0}
          onClick={handleClick}>
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
          <Grid fluid textAlign='left' divided>
            <NoteOrInstructions text={program['instructions']} />
            <Grid.Row></Grid.Row>
            {eachEssay}
          </Grid>
        </Accordion.Content>
      </Accordion>
    </Fragment>
  )
}
