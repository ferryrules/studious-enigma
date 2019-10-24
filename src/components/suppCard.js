import React, {useState, Fragment} from 'react'
import { Accordion, Icon, Grid } from 'semantic-ui-react'

export default function SuppCards(props) {
  const { name, optional, topic, prompts, display_length, instructions } = props.supp
  console.log('supp card', name);
  const [activeIndex, setActiveIndex] = useState(1)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }
  const eachPrompt = prompts.map(p=>{
    return (
      <Fragment>
        {p['prompt'].startsWith('<p>') ? p['prompt'].slice(3,-4) : p['prompt']}
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
          <Grid.Row>{instructions}</Grid.Row>
          <Grid.Column width={4}>
            <Grid.Row>
              <h5>DETAILS</h5>
              Topic: { topic ? `${topic}` : 'None' }
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
