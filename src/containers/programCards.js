import React, {Fragment} from 'react'

export default function ProgramCards(props) {
  const { programs } = props

  const eachProgram = programs.map(p=>{
    return p['name']
  })

  return (
    <Fragment>
      {eachProgram}
    </Fragment>
  )
}
