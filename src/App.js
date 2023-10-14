import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Cocktails from './components/Cocktails';
import SavedCocktails from './components/SavedCocktails';


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
        path='/savedCocktails'
        element={<SavedCocktails/>}
        />

    </Routes>
</Router>
       
        </div>
    );
}

export default App; 