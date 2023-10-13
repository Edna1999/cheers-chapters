import React, { useState } from 'react';


const SavedCocktails = () => {
    const [savedCocktail, setSavedCocktail] = useState([]);



    const addCocktail = (drink) => {

        console.log(drink);

        if(!drink.text){
            return;
        }

        const newDrink = [drink, ...savedCocktail];
        console.log(newDrink);

        setSavedCocktail(newDrink);
    };

    const removeCocktail = (id) => {

        const deletedCocktail = [...savedCocktail].filter((item) => item.id !== id);

        setSavedCocktail(deletedCocktail);
    };


    return (
        <div>

            <h1>Saved Drinks</h1>
            <div>
              cocktail={savedCocktail}
              addCocktail={addCocktail}
              removeCocktail={removeCocktail}
              </div>
            
        </div>
    );

}

export default SavedCocktails;



