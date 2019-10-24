import React, { useState, Fragment } from 'react';
import { Dropdown, Segment } from 'semantic-ui-react'
import LoadingPlaceholder from './components/loadingPlaceholder.js'
import School from './containers/school.js'
import './App.css';

const API = 'https://content-staging.prompt.com/api/data/university/'
const API_KEY = process.env.REACT_APP_API_KEY
const options = [
  { key: 1, text: 'Michigan State University', value: 171100 },
  { key: 2, text: 'Georgetown', value: 131496 },
  { key: 3, text: 'Prompt University', value: 98765 },
]


function App() {
  const [school, setSchool] = useState([])
  const [loading, setLoading] = useState(false)

  const selectSchool = async(e) => {
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
    console.log(school)
    setSchool(school)
    console.log('after call', !!school);
    setLoading(false)
  }

  return (
    <div className="App">
      { loading && !!school ?
          <Segment>
            <LoadingPlaceholder />
          </Segment>
        :
        !!school['name'] ?
          <Fragment>
            <School school={school} />
            <Dropdown clearable options={options} selection onChange={(e)=>selectSchool(e)}/>
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

export default App;
