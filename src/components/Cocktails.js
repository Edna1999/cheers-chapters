import React, { useEffect, useState } from 'react';

import '../cocktails.css';


function Cocktails() {
    
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    const itemsPerPage = 1;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;



    const [savedCocktails, setSavedCocktails] = useState(
        JSON.parse(localStorage.getItem('savedCocktails')) || []
      );

    useEffect(() => {

    }, [results])

    const handleSearch = async () => {

    
        try {

    
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    
            if(!response.ok) {
                throw new Error ('Network Not Responsive!')
            }
    
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

    

     const saveCocktail = (drink) => {

        
        const { id, name, image, ingredients, measurements, instructions } = drink;

        const isDrinkSaved = savedCocktails.some(savedDrink => savedDrink.id === id)

        if(isDrinkSaved){

            console.log('This drink is already saved!')

        } else {

        const savedCocktailInfo = { id, name, image, ingredients, measurements, instructions};

        const updatedSavedCocktails = [ ...savedCocktails, savedCocktailInfo];
        setSavedCocktails(updatedSavedCocktails);

        localStorage.setItem('savedCocktails', JSON.stringify(updatedSavedCocktails));


     }

   

      };

      const handleNextPage = () => {
        if(currentPage < Math.ceil(results.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
      }

      const handlePreviousPage = () => {
        if(currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
      }

     
        const handleDownload = () => {
    
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

        <div>

            <nav className="nav">
            <h1 className='cheers'> Cheers&#129346;Chapters </h1>
            <input 
            id='search'
            type='text'
            value={input}
            onChange={handleChange}
            placeholder='Search'
            />

            <button id='searchBtn' onClick={handleSearch}>Search</button>
           
        
        </nav>

         

          <ul className='listContainer'>
            {results.slice(startIndex, endIndex).map((drink, index) => (
                <li key={index} className='singleDrink'>
                

                
                    <h2 className='drinkName'>{drink.name}</h2>

                     <button className='save'   onClick={() => { handleDownload(); console.log('downloaded!')}}><svg style={{color: 'pink'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cloud-download-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                    </svg></button>


                    <img className='drinkImg' src={drink.image} alt='cocktailImage'/>
                    <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {drink.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}    ({drink.measurements[i]})</li>
                        ))}
                    </ul>
                
                    </div>
                    <h2>Instructions</h2>


                    <p>{drink.instructions}</p>

                    
                    <button onClick={handlePreviousPage}>&#8592;</button>
                    <button onClick={handleNextPage}>&#8594;</button>

                   
                </li>

                
            ))}

            
            
          </ul>
            
            
        </div>
    );   

};


export default Cocktails;
  
   
