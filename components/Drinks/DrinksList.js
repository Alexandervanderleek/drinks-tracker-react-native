import React from 'react'
import { FlatList, Text } from 'react-native'
import Adrink from './Adrink'


export default function DrinksList({drinks}) {

 return(
   <FlatList data={drinks} keyExtractor={(item)=>{item.id}} renderItem={({item})=>(
      <Adrink item={item}></Adrink>
      )} >

   </FlatList>
 )
}
