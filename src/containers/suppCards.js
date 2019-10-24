import React, {Fragment} from 'react'
import SuppCard from '../components/suppCard.js'

export default function SuppCards(props) {
  const { supps } = props
  console.log('supp card', props.supps);

  const eachSupp = supps.map(s=>{
    return <SuppCard supp={s} />
  })

  return (
    <Fragment>
      {eachSupp}
    </Fragment>
  )
}
