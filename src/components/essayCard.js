import React from 'react'
import EssayDetails from './essayDetails.js'

export default function EssayCard(props) {
  const { essays } = props

  const eachEssay = Object.entries(essays).map(es=>{
    return (
      <EssayDetails essay={es[0]} details={es[1]} />
    )
  })

  return (
    <div>
      {eachEssay}
    </div>
  )
}
