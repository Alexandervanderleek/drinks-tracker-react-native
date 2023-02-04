import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Adrink from './Adrink'


export default function DrinksList({drinks, onPress}) {

  if(drinks.length === 0 || drinks === null){
    return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontWeight: 'bold',color:'white', fontSize: 24}}>
        No drinks Added today
      </Text>
      <Text style={{fontWeight: 'bold',color:'white', fontSize: 24}}>
        Add drinks by clicking the plus
      </Text>
    </View>
    
    )

  }

 return(
   <FlatList data={drinks} keyExtractor={(item)=>{return item.id}} renderItem={({item})=>(
      <Adrink item={item} onPress={onPress}></Adrink>
      )} >

   </FlatList>
 )
}
