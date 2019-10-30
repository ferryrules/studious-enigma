import React, { useState } from 'react'
import EssayDetails from '../components/essayDetails.js'
import { Segment } from 'semantic-ui-react'

export default function EssayCards(props) {
  const { appSupp } = props
  const [openThisOne, setOpenThisOne] = useState([])

  const match = (prompt) => {
    return prompt === openThisOne
  }

  const handleClick = (e, titleProps, prompt) => {
    if (match(prompt)) {
      setOpenThisOne([])
    } else {
      setOpenThisOne(prompt)
    }
  }

  const eachEssayType = (essays) => {
    return Object.entries(essays).map(([type, prompt])=>{
      return (
        <EssayDetails type={type} prompt={prompt} key={type} activeIndex={match(prompt) ? 0 : 1} handleClick={handleClick} />
      )
    })
  }

  const eachEssay = Object.entries(appSupp).map(([name, cat])=>{
    return (
      <Segment vertical textAlign='left' color='teal' key={name}>
        <h3>{name}</h3>
        {eachEssayType(cat)}
      </Segment>
    )
  })

  return (
    <div>
      {eachEssay}
    </div>
  )
}
