import React from 'react';
import Textform from './Textform';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Translator from './Translator'
import { useEffect } from 'react';
import Navbar from './Navbar';

function App() {
  
  useEffect(()=>{
    if(window.screen.width>768){
        document.body.classList.remove("bg-dark")
        document.body.classList.add("blue")
    }  
},[])

  return ( 
    <Router>
          <Routes>
             <Route path='/translator' element={<><Navbar name="Translator" Translator="active" /><Translator/></>}/>
             <Route path='/' element={<><Navbar name="TextEditor" Home="active"/> <Textform heading="Enter here 👇"/></>}/> 
          </Routes>
    </Router>
  );
}

export default App;
