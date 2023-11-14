import React, { useState, useEffect } from 'react';

import '../cocktails.css';



function Download(){
    const [results, setResults] = useState([]);


    const [savedCocktails, setSavedCocktails] = useState(
        JSON.parse(localStorage.getItem('savedCocktails')) || []
      );

    useEffect(() => {

    }, [results])

function handleDownload() {
   

    
    const drinkInfo = savedCocktails.map((drink, index) => {
        return `${index + 1}, ${drink.name}\nIngredients: ${drink.ingredients.join(', ')}\nInstructions: ${drink.instructions}\n\n`
    }).join('\n');


    const blob = new Blob([drinkInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_recipes.txt';
    a.click();

}

    return (
        <div className=''>

                    <button className='save'   onClick={() => { handleDownload(); console.log('downloaded!')}}>&#8595;</button>
        </div>
    )


}

export default Download;