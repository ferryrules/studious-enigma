import React, {Fragment} from 'react'
import EssayCard from '../components/essayCard.js'
import { Segment } from 'semantic-ui-react'

function EssayCards(props) {
  const { application_essays, applications, supplements } = props.school
  console.log('essay', application_essays);
  // console.log('application', applications);
  // console.log('supplement', supplements);
  // console.log(application_essays[2]);
  applications.push("University Application")

  const eachCommonEssay = application_essays.map(ae => {
    // console.log(ae);
    return <EssayCard commonEssay={ae} />
  })

  return (
    <Fragment fluid>
      { eachCommonEssay.length > 0 ? (
        <Fragment>
          <h2>Common App</h2>
          {eachCommonEssay}
        </Fragment>
      ) : null }
    </Fragment>
  )
}

export default EssayCards
