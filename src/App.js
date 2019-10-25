import React, { useState, Fragment } from 'react';
import { Dropdown, Dimmer, Loader, Button } from 'semantic-ui-react'
import School from './containers/school.js'
import './App.css';

const API = 'https://content-staging.prompt.com/api/data/university/'
const API_KEY = process.env.REACT_APP_API_KEY
const options = [
  { key: 1, text: 'Michigan State University', value: 171100 },
  { key: 2, text: 'Georgetown', value: 131496 },
  { key: 3, text: 'Prompt University', value: 98765 },
]
const essayTypeKeys = ['Application Essay', 'Required Supplement', 'Optional Supplement']

export default function App() {
  const [school, setSchool] = useState([])
  const [loading, setLoading] = useState(false)
  const [progMajScholArray, setProgMajScholArray] = useState([])
  const [appSuppArray, setAppSuppArray] = useState([])

  const selectSchool = async(e) => {
    progMajScholArray.forEach(p=>p.pop())
    appSuppArray.forEach(a=>a.pop())
    setLoading(true)
    let iped = options.find(s=>{
      return s['text'] === e.target.innerText
    })
    const school = await fetch(`${API}${iped['value']}/?identifierType=iped`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    })
    .then(r=>r.json())
    setSchool(school)
    if (!school.applications.includes('University Application')) {
      school.applications.push('University Application')
    }
    school.programs.forEach(p=>{
      if (p.supplements.length > 0) {
        progMajScholArray.push(p)
      }
    })

    school.supplements.forEach(sup=>{
      sup.applications.forEach(supap=>{
        if (!appSuppArray[supap]) {
          // eslint-disable-next-line
          essayTypeKeys.map(etk=>{
            appSuppArray[supap] = {...appSuppArray[supap], [etk]: []}
          })
        }
        if (sup.optional) {
          appSuppArray[supap]['Optional Supplement'].push(sup)
        } else {
          appSuppArray[supap]['Required Supplement'].push(sup)
        }
      })
    })
    school.application_essays.forEach(app_es=>{
      if (app_es.applications.length === 0) {
        app_es.applications.push('Common App')
      }
      app_es.applications.forEach(app_es_app=>{
        if (!appSuppArray[app_es_app]) {
          // eslint-disable-next-line
          essayTypeKeys.map(etk=>{
            appSuppArray[app_es_app] = {...appSuppArray[app_es_app], [etk]: []}
          })
        }
        appSuppArray[app_es_app]['Application Essay'].push(app_es)
      })
    })
    setLoading(false)
  }

  const resetChoice = () => {
    setSchool([])
    setProgMajScholArray([])
    setAppSuppArray([])
  }

  return (
    <div className="App">
      { loading && !!school ?
          <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        :
        !!school['name'] ?
          <Fragment>
            <School school={school} programs={progMajScholArray} appSupp={appSuppArray} essayKeys={essayTypeKeys} />
            <Button onClick={()=>resetChoice([])}>Back</Button>
          </Fragment>
        :
        <header className="App-header">
          Select Your University
          <br />
          <br />
          <Dropdown clearable options={options} selection onChange={(e)=>selectSchool(e)}/>
        </header>
      }
    </div>
  );
}
