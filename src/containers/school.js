import React, { useState } from 'react'
import EssayCards from './essayCards.js'
import ProgramDetails from '../components/programDetails.js'
import { Segment } from 'semantic-ui-react'

function School(props) {
  const { school, programs, appSupp } = props

  const [openThisOne, setOpenThisOne] = useState([])

  const matchPrompt = (prompt) => {
    return prompt === openThisOne
  }

  const handleClick = (e, titleProps, prompt) => {
    if (matchPrompt(prompt)) {
      setOpenThisOne([])
    } else {
      setOpenThisOne(prompt)
    }
  }

  const eachProgram = programs.map(p=>{
    return (
      <ProgramDetails program={p} key={p['name']} activeIndex={matchPrompt(p) ? 0 : 1} handleClick={handleClick} />
    )
  })

  return (
    <Segment fluid="true">
      <h1 className="uni-header">
        Essay Requirements - {school['name']}
      </h1>
      <EssayCards appSupp={appSupp} matchPrompt={matchPrompt} handleClick={handleClick} />
      {eachProgram}
    </Segment>
  )
}

export default School
