import React, { useState } from 'react'
import Chat from './assets/Chat'

const App = () => {
 const [Name ,setName] = useState();
 
 let id = Name;

  
  return (
    <div>

      <form>
        <input type="text"  value ={Name} onChange={e => setName(e.target.value)} />

      </form>
      <h1>Chatt app</h1>
      <Chat userId={id}/>
    </div>
  )
}

export default App
