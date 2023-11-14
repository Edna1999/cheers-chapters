import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

import Download from './Download';
import '../cocktails.css';



function CocktailDetails() {

    let { name } = useParams();
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
          .then((response) => response.json())
          .then((data) => {
            
            if(data.drinks && data.drinks.length > 0 ){
                const drink = {
                    id: data.drinks[0].idDrink,
                   name:data.drinks[0].strDrink,
                   image: data.drinks[0].strDrinkThumb,
                   ingredients:[],
                    measurements:[],
                    instructions: data.drinks[0].strInstructions
                }
                for (let i = 1; i <= 15; i++){
                    const ingredient = data.drinks[0][`strIngredient${i}`];
                    const measurement = data.drinks[0][`strMeasure${i}`];
    
                    if(ingredient && ingredient.trim() !== ''){
                        drink.ingredients.push(ingredient);
                        drink.measurements.push(measurement);
                    }
                }
               setCocktail(drink);


            } else {

                console.error('No cocktail data found for: ' + name);
                
                setCocktail(null);
            }
            
         

            })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, [name]);

      if(!cocktail){
        return <div>Loading...</div>
      }
            return (
        
        <div className='body'>

         <div className='navContainer' id="detailNav">
         <Link to={`/cheers-chapters`}className='detailcheers'>Cheers&#129346;Chapters</Link>
         </div>   
        

<div className="details">
          <div className='singleDrink'>
            <h1 className='detailsName'>{cocktail.name}  </h1> 
            <Download/>
            <img className='drinkImg' 
                    src={cocktail.image} 
                    alt='cocktailImage'
                    
                    /> 
                   
            <h2>Ingredients</h2>
            <ul className='ing'>
              {cocktail.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient} ({cocktail.measurements[i]})</li>
              ))}
            </ul>
            <h2>Instructions</h2>
            <p className='inst'>{cocktail.instructions}</p>
            
          </div>
        </div>
        </div>
      );
    }
    
    export default CocktailDetails;

