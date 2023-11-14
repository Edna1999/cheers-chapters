import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Cocktails from './components/Cocktails';
import CocktailDetails from './components/Details';
import Recipes from './components/Recipes';



function App() {
    return (
        <div className='cocktail-app'>

<Router>

    <Routes>


    <Route
       path='/cheers-chapters'
        element={<Cocktails/>}
        />

        <Route
        path='/cocktail/recipes/:input'
        element={<Recipes/>}
        />

        <Route
        path="/cocktail/:name"
        element={<CocktailDetails />} 
        />
                
            
       

    </Routes>
</Router>
       
        </div>
    );
}

export default App; 