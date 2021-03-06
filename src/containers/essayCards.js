import React from 'react'
import EssayDetails from '../components/essayDetails.js'
import { Segment } from 'semantic-ui-react'

export default function EssayCards(props) {
  const { appSupp, matchPrompt, handleClick } = props

  const eachEssayType = (essays) => {
    return Object.entries(essays).map(([type, prompt])=>{
      return (
        <EssayDetails type={type} prompt={prompt} key={type} activeIndex={matchPrompt(prompt) ? 0 : 1} handleClick={handleClick} />
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
