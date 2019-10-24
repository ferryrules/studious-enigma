import React, {useState, Fragment} from 'react'
import { Accordion, Icon, Grid } from 'semantic-ui-react'

export default function SuppCards(props) {
  const { name, optional, topic, prompts, display_length, instructions } = props.supp
  const [activeIndex, setActiveIndex] = useState(1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }
  console.log(instructions);
  const eachPrompt = prompts.map(p=>{
    return (
      <Fragment>
        <div dangerouslySetInnerHTML={{ __html: p['prompt']}} />
        <br />
      </Fragment>
    )
  })
  const noteOrInstructions = () => {
    if (instructions === "<p>Note: This prompt only appears after the application fee is paid.</p>") {
      return (
        <Fragment>
          <Grid.Column width={16}>
            <i><div dangerouslySetInnerHTML={{ __html: instructions}} /></i>
          </Grid.Column>
        </Fragment>
      )
    }
    if (instructions) {
      let instruct = (instructions.startsWith('<p>')) ?
        <Grid.Row dangerouslySetInnerHTML={{ __html: instructions}} />
      :
        <Grid.Row>{instructions}</Grid.Row>
      return (
        <Grid>
          <b>INSTRUCTIONS: </b>
          <p>{instruct}</p>
        </Grid>
      )
    }
  }
  return (
    <Accordion fluid styled>
      <Accordion.Title
        active={activeIndex===0}
        index={0}
        onClick={handleClick}>
        <Icon name='dropdown' />
        {name} {optional ? <i> *Optional</i> : null}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Grid fluid textAlign='left'>
          {noteOrInstructions()}
          <Grid.Column width={4}>
            <Grid.Row>
              <h5>DETAILS</h5>
              Topic: { topic ? `${topic}` : 'None' }
              <br />
              Max Length: {display_length}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              {prompts.length > 0 ? (
                <Fragment>
                  <h5>PROMPTS</h5>
                  {eachPrompt}
                </Fragment>
              ) : null }
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Accordion.Content>
    </Accordion>
  )
}
