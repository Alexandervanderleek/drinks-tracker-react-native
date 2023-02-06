import React, { useState } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../Button';
import { GlobalConstants } from '../../util/constants'
import DrinkOption from './DrinkOption'
import { useNavigation } from '@react-navigation/native';
import { addDrinks, todaysDrinks } from '../../util/database';
import CustomDrinks from './CustomDrinks';

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
     <View style={{margin: 8, borderRadius: 12}}>
      <Button onPress={drinksToDb}>ADD DRINKS</Button>
     </View>

     {/* Custom drink option */}
     <Text style={styles.sectionTitle}> Custom Drinks </Text>
    <CustomDrinks date={date} newDrink={addDrink}></CustomDrinks>
    <Text style={styles.sectionTitle}> Default Drinks </Text>
    <View style={{flex:1}}>
      <FlatList
            data={GlobalConstants.DefaultDrinks}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(<DrinkOption newDrink={addDrink} date={date} item={item}></DrinkOption>)}
        
        ></FlatList>
    
    </View>
      
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical: 12,
    flex: 1
  },
  sectionTitle:{borderBottomColor: 'white', marginBottom: 2, borderBottomWidth: 2, marginHorizontal: 12, paddingBottom: 4, fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center'}
})
