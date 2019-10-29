import React, {useState, Fragment} from 'react'
import EditPrompt from './editPrompts.js'
import NoteOrInstructions from './noteOrInstructions.js'
import { Accordion, Icon, Header, Grid, Segment } from 'semantic-ui-react'

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
        <EditPrompt prompt={p['prompt']} key={p['name']+p['prompt']}/>
      )
    })
    const noteOrInstructions = () => {
      return <NoteOrInstructions text={d['instructions']} />
    }
    return (
      <Accordion.Content active={activeIndex === 0} key={d['name']}>
      <Segment>
        <Grid fluid="true" textAlign='left' divided>
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
              <h5>PROMPTS</h5>
              {eachPrompt}
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
