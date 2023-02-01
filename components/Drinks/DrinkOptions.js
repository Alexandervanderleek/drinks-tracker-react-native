import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { GlobalConstants } from '../../util/constants'
import DrinkOption from './DrinkOption'

export default function DrinkOptions() {

  const [drinks, setDrink] = useState([]);

  function addDrink(newDrink){
    const index = drinks.findIndex((item)=>{item.id ===  newDrink.id});
    if(index){

    }else{
      setDrink([...drinks,newDrink]);
    }
  }

  function removeDrink(){

  }


  return (
    <FlatList
        data={GlobalConstants.DefaultDrinks}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(<DrinkOption newDrink={addDrink} name={item.name} volume={item.volume} strength={item.strength} icon={item.icon}></DrinkOption>)}
    
    ></FlatList>
    
  )
}
