import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Button from '../Button';
import { GlobalConstants } from '../../util/constants'
import DrinkOption from './DrinkOption'
import { useNavigation } from '@react-navigation/native';

export default function DrinkOptions() {

  const navigation = useNavigation();

  const [drinks, setDrink] = useState([]);

  function drinksToDb(){
    navigation.navigate('TodaysDrinks');
  }

  function addDrink(newDrink){
     if(newDrink.quantity>0){
      const index = drinks.findIndex((item)=>{ return item.id ===  newDrink.id});
      if(index>-1){
        setDrink([...drinks.filter((item) =>{ return item.id !== newDrink.id}),newDrink])
      }else{
        setDrink([...drinks,newDrink]);
      }
     }else{
       setDrink([...drinks.filter((item) =>{ return item.id !== newDrink.id})])
     }
  }



  return (
    <View style={styles.container}>
     <View style={{margin: 12, borderRadius: 12}}>
      <Button onPress={drinksToDb}>ADD DRINKS</Button>
     </View>
    
    <FlatList
        data={GlobalConstants.DefaultDrinks}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(<DrinkOption newDrink={addDrink} item={item}></DrinkOption>)}
    
    ></FlatList>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical: 12
  }
})
