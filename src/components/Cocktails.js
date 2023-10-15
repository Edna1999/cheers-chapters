import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




function Cocktails() {
    
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);



    const [savedCocktails, setSavedCocktails] = useState(
        JSON.parse(localStorage.getItem('savedCocktails')) || []
      );

    useEffect(() => {

        console.log(results)
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

    const handleDropdown = (drinkId) => {

        setSelectedDrink(selectedDrink === drinkId ? null : drinkId);

    }

     const saveCocktail = (cocktail) => {

        const { id, name, image, ingredients, measurements, instructions } = cocktail;

        const savedCocktailInfo = { id, name, image, ingredients, measurements, instructions};

        const updatedSavedCocktails = [ ...savedCocktails, savedCocktailInfo];
        setSavedCocktails(updatedSavedCocktails);

        localStorage.setItem('savedCocktails', JSON.stringify(updatedSavedCocktails));

      console.log(savedCocktailInfo)


      };


    


    return (

        <div>

            <nav className="nav">
            <button  className="nav-item">
            <Link to='/savedCocktails'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-floppy-fill" viewBox="0 0 16 16">
            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5v-13Z"/>
            <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V16Zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V0ZM9 1h2v4H9V1Z"/>
        </svg></Link>
        </button>
        
        </nav>

            <input 
            id='search'
            type='text'
            value={input}
            onChange={handleChange}
            placeholder='Search'
            />

            <button id='searchBtn' onClick={handleSearch}>Search</button>

          <ul >
            {results.map((drink, index) => (
                <li key={index}>
                    <div onClick={() => handleDropdown(drink.id)}>
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

                    <button onClick={() => {saveCocktail(drink); console.log(saveCocktail)}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cloud-download-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                    </svg></button>

                    </div>

                    
                 )}   

                </li>

                
            ))}

            
            
          </ul>
            
            
        </div>
    );   

};

export default Cocktails;
  
   
