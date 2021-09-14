import './App.css';

import Header from './components/Header';
import Users from './components/Users/Users.js'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
  <BrowserRouter>
    <div id="box">
     <Header/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="Users/*" element={<Users/>}/>
     </Routes>
    </div>
  </BrowserRouter>
 
  );
}

export default App;
