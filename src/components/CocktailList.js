import React, { useState } from 'react';
import CocktailForm from './CocktailForm';


function CocktailList(){

 const [cocktail, setCocktail] = useState('');


    const addCocktail = (drink) => {

        console.log(drink);

        if(!drink.text){
            return;
        }

        const newDrink = [drink, ...cocktail];
        console.log(newDrink);

        setCocktail(newDrink);
    };

    const removeCocktail = (id) => {

        const deletedCocktail = [...cocktail].filter((item) => item.id !== id);

        setCocktail(deletedCocktail);
    };


    return (
        <div>

            <h1>Saved Drinks</h1>
            <CocktailForm
              cocktail={cocktail}
              addCocktail={addCocktail}
              removeCocktail={removeCocktail}
            />
        </div>
    );

}

export default CocktailList;



