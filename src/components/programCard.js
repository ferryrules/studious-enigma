import React, {useState, Fragment} from 'react'
import { Accordion, Icon, Grid, Container, Header } from 'semantic-ui-react'

export default function SuppCards(props) {
  const { program } = props
  const [activeIndex, setActiveIndex] = useState(1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const noteOrInstructions = () => {
    if (program['instructions'] === "<p>Note: This prompt only appears after the application fee is paid.</p>") {
      return (
        <Fragment>
          <Grid.Column width={16}>
            <i><div dangerouslySetInnerHTML={{ __html: program['instructions']}} /></i>
          </Grid.Column>
        </Fragment>
      )
    }
    if (program['instructions']) {
      let instruct = (program['instructions'].startsWith('<p>')) ?
      <Grid.Row dangerouslySetInnerHTML={{ __html: program['instructions']}} />
      :
      <Grid.Row>{program['instructions']}</Grid.Row>
      return (
        <Grid>
          <b>INSTRUCTIONS: </b>
          <Container textAlign='left'>{instruct}</Container>
        </Grid>
      )
    }
  }

  const eachEssay = program['supplements'].map(ps=>{
    const eachPrompt = ps['prompts'].map(p=>{
      return (
        <Fragment>
          <div dangerouslySetInnerHTML={{ __html: p['prompt']}} />
          <br />
        </Fragment>
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
          <Header as='h3' textAlign='left'>
            <Icon name='dropdown' />
             {program['name']}
          </Header>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Grid fluid textAlign='left'>
            {noteOrInstructions()}
            <br />
            {eachEssay}
          </Grid>
        </Accordion.Content>
      </Accordion>
    </Fragment>
  )
}