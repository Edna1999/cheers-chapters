import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import '../cocktails.css';



function Cocktails() {
    
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
   
    
    const searchBtnRef = useRef(null);

    

    const handleSearch = async () => {

        try {

            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`);
    
            if(!response.ok) {
                throw new Error ('Network Not Responsive!')
            };
    
            const searchData = await response.json();
            const drinkNames = searchData.drinks.map(drink => ({
                id: drink.idDrink,
                name: drink.strDrink,
                image: drink.strDrinkThumb,
                ingredients:[drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10, drink.strIngredient11, drink.strIngredient12].filter(Boolean),
                measurements:[drink.strMeasure1, drink.strMeasure2, drink.strMeasure3, drink.strMeasure4, drink.strMeasure5, drink.strMeasure6, drink.strMeasure7,drink.strMeasure8, drink.strMeasure9, drink.strMeasure10, drink.strMeasure11, drink.strMeasure12 ].filter(Boolean),
                instructions: drink.strInstructions

            }))


            setResults(drinkNames);
           
        } catch (error) {
    
            console.error('Error: ', error);
        }

        setInput('');
    
    };


    const handleChange = (e) => {
        setInput(e.target.value);
    }


      const handleKeyPress = (e) => {

        if(e.key === 'Enter' || e.keyCode === 13){
            if(searchBtnRef.current){

                searchBtnRef.current.click();
            }
           
        }
      }
     

    return (

        <div>

       <div className='navContainer'>
         <h1 className='cheers'> Cheers&#129346;Chapters </h1>
             <input 
            id='search'
            type='text'
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyPress} 
            placeholder='Search'
            
            />  
          
        <Link to={`/cocktail/recipes/${input}`}>
        <button 
        id='searchBtn'
         onClick={handleSearch}
         ref={searchBtnRef}
          tabIndex="0"
          >
            &#128269;
            </button>
           </Link> 
 
            </div>   

        <nav className="nav"></nav>

          </div>
       
    );   

};


export default Cocktails;
  
   
