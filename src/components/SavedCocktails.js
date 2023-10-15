import React, { useState } from 'react';
import { Link } from 'react-router-dom';




const SavedCocktails = () => {

    const [selectedDrink, setSelectedDrink] = useState(null);


    const savedRecipes = JSON.parse(localStorage.getItem('savedCocktails')) || [];

    const handleDropdown = (drinkId) => {

        setSelectedDrink(selectedDrink === drinkId ? null : drinkId);

    }

   
 

    return (
        
       <div>
        <nav className="nav">
        
        <button className="nav-item">
        <Link to='/cheers-chapters'>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
        </svg>
        </Link>
        </button>

        </nav>    

        <div>

        <h1>Saved Cocktails</h1>
        
        <ul >
            {savedRecipes.map((drink, index) => (
                <li key={index}>
                    <div onClick={() => {handleDropdown(drink.id); console.log(savedRecipes)}}>
                    <h2>{drink.name}</h2>

                    </div>

                    {selectedDrink === drink.id && (

                    <div>

                    <img src={drink.image} alt='cocktailImage'/>
                    <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {drink.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}    ({drink.measurements[i]})</li>
                        ))}
                    </ul>
                
                    </div>
                    <p>{drink.instructions}</p>

                

                    </div>

                    
                 )}   

                </li>

                
            ))}

            
            
          </ul>


         

        </div>

        </div>
            
        
    );

}

export default SavedCocktails;



