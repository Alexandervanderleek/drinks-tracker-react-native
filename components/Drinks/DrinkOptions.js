import React, { useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import Button from '../Button';
import { GlobalConstants } from '../../util/constants'
import DrinkOption from './DrinkOption'
import { useNavigation } from '@react-navigation/native';
import { addDrinks, todaysDrinks } from '../../util/database';

export default function DrinkOptions({date, isToday}) {

  const navigation = useNavigation();

  const [drinks, setDrink] = useState([]);

  async function drinksToDb(){
    if(drinks.length>0){
      const currentDrinks =await todaysDrinks(date);
      await addDrinks(drinks, currentDrinks.drinks);
      
      isToday ? navigation.navigate('TodaysDrinks') : navigation.navigate('PastDrinks');
    }else{
      Alert.alert("No Drinks","You have no drinks selected.\nTry adding drinks by pressing the plus icon.")
    }
    
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
        renderItem={({item})=>(<DrinkOption newDrink={addDrink} date={date} item={item}></DrinkOption>)}
    
    ></FlatList>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical: 12
  }
})
