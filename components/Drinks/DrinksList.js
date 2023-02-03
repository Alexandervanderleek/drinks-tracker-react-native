import React from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { todaysDrinks } from '../../util/database';

export default function DrinksList({drinks}) {

  // async function getDrinks(){
  //   const drinks  = await todaysDrinks();
  //   console.log(JSON.stringify(drinks));
  // }

  // console.log(JSON.stringify(drinks))

  // if(drinks.length=0){
  //   return (<Text>No drinks</Text>)
  // }

  // return (
  //   <FlatList data={drinks} keyExtractor={(item)=>{item.id}} renderItem={({item})=>(<Text>{item.name}</Text>)}>

  //   </FlatList>
  // )

 console.log("FUCK OFF"+JSON.stringify(drinks))
 return(
    <Text>{JSON.stringify(drinks)}</Text>
 )
}
