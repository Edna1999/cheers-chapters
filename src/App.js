import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Cocktails from './components/Cocktails';


function App() {
    return (
        <div className='cocktail-app'>

<Router>

    <Routes>


    <Route
        exact path='/cheers-chapters'
        element={<Cocktails/>}
        />
        
    
       

    </Routes>
</Router>
       
        </div>
    );
}

export default App; 