import React from 'react'
import EssayCard from '../components/essayCard.js'
import { Segment } from 'semantic-ui-react'

export default function EssayCards(props) {
  const { appSupp } = props

  const eachEssay = Object.entries(appSupp).map(apsp=>{
    return (
      <Segment>
        <h3>{apsp[0]}</h3>
        <EssayCard essays={apsp[1]} />
      </Segment>
    )
  })

  return (
    <div>
      {eachEssay}
    </div>
  )
}
