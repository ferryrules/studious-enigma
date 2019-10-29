import React from 'react'
import EssayCards from './essayCards.js'
import ProgramCard from '../components/programCard.js'
import { Segment } from 'semantic-ui-react'

function School(props) {
  const { school, programs, appSupp } = props

  const eachProgram = programs.map(p=>{
    return (
      <ProgramCard program={p} key={p['name']}/>
    )
  })

  return (
    <Segment fluid="true">
      <h1 className="uni-header">
        Essay Requirements - {school['name']}
      </h1>
      <EssayCards appSupp={appSupp} />
      {eachProgram}
    </Segment>
  )
}

export default School
