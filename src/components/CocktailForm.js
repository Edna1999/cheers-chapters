import React, { useEffect, useState } from 'react';



function CocktailForm(props) {
    
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);

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
            console.log(searchData);

            const drinkNames = searchData.drinks.map(drink => ({
                id: drink.idDrink,
                name: drink.strDrink,
                image: drink.strDrinkThumb,
                ingredients:[drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10, drink.strIngredient11, drink.strIngredient12].filter(Boolean),
                measurements:[drink.strMeasure1, drink.strMeasure2, drink.strMeasure3, drink.strMeasure4, drink.strMeasure5, drink.strMeasure6, drink.strMeasure7,drink.strMeasure8, drink.strMeasure9, drink.strMeasure10, drink.strMeasure11, drink.strMeasure12 ].filter(Boolean),
                instructions: drink.strInstructions

            }))


            setResults(drinkNames);
            console.log([results])
    
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


    return (

        <div>

            <input 
            type='text'
            value={input}
            onChange={handleChange}
            placeholder='Search'
            />

            <button onClick={handleSearch}>Search</button>

          <ul>
            {results.map((drink, index) => (
                <li key={index}>
                    <div onClick={() => handleDropdown(drink.id)}>
                    <h2>{drink.name}</h2>

                    </div>

                    {selectedDrink === drink.id && (

                    <div>

                    <img src={drink.image} alt='cocktailImage'/>
                    <div id='container'>
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
    );   

};

export default CocktailForm;
  
   
