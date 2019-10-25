import React from 'react'
import ProgramCard from '../components/programCard.js'

export default function ProgramCards(props) {
  const { programs } = props

  const eachProgram = programs.map(p=>{
    return (
      <ProgramCard program={p} />
    )
  })

  return (
    <div>
      {eachProgram}
    </div>
  )
}
