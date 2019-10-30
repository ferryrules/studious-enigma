import React, { useState } from 'react'
import EssayDetails from '../components/essayDetails.js'
import { Segment } from 'semantic-ui-react'

export default function EssayCards(props) {
  const { appSupp } = props
  const [activeIndex, setActiveIndex] = useState(1)
  const [openThisOne, setOpenThisOne] = useState([])

  const handleClick = (e, titleProps, prompt) => {

    setOpenThisOne(prompt)
    const { index } = titleProps
    const newIndex = activeIndex === index ? 1 : index
    setActiveIndex(newIndex)
  }

  const match = (prompt) => {
    return prompt === openThisOne
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
