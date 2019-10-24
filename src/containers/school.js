import React from 'react'
import EssayCards from './essayCards.js'
import { Segment } from 'semantic-ui-react'

function School(props) {
  const { school } = props
  return (
    <Segment fluid>
      <h1 className="uni-header">
        Essay Requirements - {school['name']}
      </h1>
      <EssayCards school={school} />
    </Segment>
  )
}

export default School
