import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios' 

function App() { 
  const[recipeName, setRecipeName] = useState("")
  const[recipeIngr, setRecipeIngr] = useState("")
  const[recipeStep, setRecipeStep] = useState("")
  const[recipesList, setRecipesList] = useState([])

  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response)=> {
      setRecipesList(response.data)
    })
  },[])

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert',{
      recipe_name: recipeName, //konstr param obiektow
      recipe_ingr: recipeIngr,
      recipe_step: recipeStep,
    });
      setRecipesList([...recipesList, 
         {recipe_name: recipeName,
          recipe_ingr: recipeIngr,
          recipe_step: recipeStep},
         ]);
         //recipeStep = ''
  };

  const deleteReview = (recipe) => {
    Axios.delete(`http://localhost:3001/api/delete/${recipe}` )
  }

  return (
    <body>
    <div className="App">
      <p>  </p>
      <p className='logo'> 🤷 🍆 Przepisy Siostry Eutanazji  🍆 🤦</p>
      <p>   </p>
        <div className="form">
          <input 
            type="text"
            name="recipeName" 
            placeholder=" ⮞⮞⮞ Podaj nazwę potrawy" 
            onChange={(e)=> {
              setRecipeName(e.target.value)
              }}
              />

          <input 
            type="text"
            name="recipeIngr" 
            placeholder=" ⮞⮞⮞ Podaj składniki" 
            onChange={(e)=> {
              setRecipeIngr(e.target.value )
              }} />

          <input 
          type="text"
          name="recipeStep" 
          placeholder=" ⮞⮞⮞ Podaj kroki przygotowania" 
          onChange={(e)=> {
              setRecipeStep(e.target.value)
              }}/>

          <button className="button button1" onClick={submitReview}>dodaj</button>

          {recipesList.map((val)=> {
            return <div className="card">
                      <p className="p_card_head"> {val.recipe_name}</p>  
                      <p className="p_card">🧪 Składniki:</p>
                      <p className="p_card_list">{val.recipe_ingr}</p>
                      <p className="p_card">🦶 Kroki:</p>
                      <p className="p_card_list">{val.recipe_step}</p>
                      <button className='button button2' onClick={()=> {deleteReview(val.recipe_name)}}>❌ usuń</button>  
                    </div>
          })}
        </div>
    </div>
  </body>  
  );
}

export default App;