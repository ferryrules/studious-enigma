import React, {useState, Fragment} from 'react'
import { Accordion, Icon, Grid } from 'semantic-ui-react'

export default function EssayCard(props) {
  const { name, optional, topic, prompts, display_length, instructions } = props.commonEssay
  const [activeIndex, setActiveIndex] = useState(1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }
  const eachPrompt = prompts.map(p=>{
    return (
      <Fragment>
        <div dangerouslySetInnerHTML={{ __html: p['prompt']}} />
        <br />
      </Fragment>
    )
  })

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
          <Grid.Row textAlign='left' dangerouslySetInnerHTML={{ __html: instructions}}>
            {instructions.length > 0 ? 'INSTRUCTIONS: ' : null }
          </Grid.Row>
          <Grid.Column width={4}>
            <Grid.Row>
              <h5>DETAILS</h5>
              { topic ? `Topic: ${topic}` : null }
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
