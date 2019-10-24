import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import './App.css';

const API = 'https://content-staging.prompt.com/api/data/university/'
const API_KEY = process.env.REACT_APP_API_KEY
const options = [
  { key: 1, text: 'Michigan State University', value: 171100 },
  { key: 2, text: 'Georgetown', value: 131496 },
  { key: 3, text: 'Prompt University', value: 98765 },
]

const selectSchool = async(e) => {
  const school = await fetch(`${API}${options[0]['value']}/?identifierType=iped`, {
    headers: {
      'Authorization': `Token ${API_KEY}`
    }
  })
  .then(r=>r.json())
  console.log(school)
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown clearable options={options} selection onChange={(e)=>selectSchool(e)}/>
      </header>
    </div>
  );
}

export default App;
