import React, {Fragment} from 'react'
import EssayCard from '../components/essayCard.js'
import SuppCards from './suppCards.js'
import {  } from 'semantic-ui-react'

export default function EssayCards(props) {
  const { application_essays, applications, supplements } = props.school
  applications.push("University Application")

  const eachCommonEssay = application_essays.map(ae => {
    return <EssayCard commonEssay={ae} />
  })
  const eachSupp = applications.map(a=>{
    // eslint-disable-next-line
    let supps = supplements.filter(s=>{
      if (s['applications'].includes(a)) {
        return a
      }
    })
    return (
      <Fragment>
        <h2>{a}</h2>
        <SuppCards supps={supps} />
      </Fragment>
    )
  })
  return (
    <Fragment fluid>
      { eachCommonEssay.length > 0 ? (
        <Fragment>
          <h2>Common App</h2>
          {eachCommonEssay}
        </Fragment>
      ) : null }
      {eachSupp}
    </Fragment>
  )
}
