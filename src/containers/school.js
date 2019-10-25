import React from 'react'
import EssayCards from './essayCards.js'
import ProgramCards from './programCards.js'
import { Segment } from 'semantic-ui-react'

function School(props) {
  const { school, programs, appSupp, essayKeys } = props
  
  return (
    <Segment fluid>
      <h1 className="uni-header">
        Essay Requirements - {school['name']}
      </h1>
      <EssayCards appSupp={appSupp} essayKeys={essayKeys} />
      <ProgramCards programs={programs} essayKeys={essayKeys} />
    </Segment>
  )
}

export default School
