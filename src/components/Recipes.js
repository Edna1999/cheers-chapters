import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


import '../cocktails.css';

function Recipes() {
   
    let { input } = useParams();
    const [cocktail, setCocktail] = useState([]);
    const[selectedCocktail, setSelectedCocktail] = useState(null);

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
          .then((response) => response.json())
          .then((data) => {
            
            if(data.drinks && data.drinks.length > 0 ){
                const drink = data.drinks.map((drinkData) => ({
                    id: drinkData.idDrink,
                   name:drinkData.strDrink,
                   image: drinkData.strDrinkThumb,
                   ingredients:[],
                    measurements:[],
                    instructions: drinkData.strInstructions
                }));

                for (let i = 1; i <= 15; i++){

                    drink.forEach((drinks, index) => {
                        const ingredient = data.drinks[index][`strIngredient${i}`];
                        const measurement = data.drinks[index][`strMeasure${i}`];
                        if(ingredient && ingredient.trim() !== ''){
                            drinks.ingredients.push(ingredient);
                            drinks.measurements.push(measurement);
                        }
                    })
                   
                   
                }
                setCocktail(drink);



            } else {

                console.error('No cocktail data found for: ' + input);
                
                setCocktail(null);
            }
            
         

            })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, [input]);

      if (!cocktail) {
        return <div>Loading...</div>;
      }

  
       



    const handleImageClick = (index) => {

        if(selectedCocktail === index){
            setSelectedCocktail(null);
        } else {
            setSelectedCocktail(index)
        }
    }

    


    return (
        <div className='body'>

        <div className='navContainer' id="detailNav">
         <Link to={`/cheers-chapters`}className='detailcheers'>Cheers&#129346;Chapters</Link>
         </div>   
        
        <h1 className='recipe'>Recipes</h1>

        <ul className='options' >

           {cocktail.map((drink, index) => (
               <li  id='target' key={index} className='singleDrink'>
                 
               <div   className='text'>
               
               <img className='drinkImg' 
                   src={drink.image} 
                   alt='cocktailImage'
                   onClick={() => handleImageClick(index)}
                   
                   /> 
                   <Link to={`/cocktail/${drink.name}`} className='drinkName'>{drink.name} </Link>

                  
            </div>
                   
               </li>

               
           ))}

           
         </ul>


         </div>
    )



}

export default Recipes;