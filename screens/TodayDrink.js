import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {  StyleSheet, View } from 'react-native'
import DrinkAnalytics from '../components/Drinks/DrinkAnalytics'
import DrinkList from '../components/Drinks/DrinksList';
import { GlobalConstants } from '../util/constants'
import { deleteDrink, thisWeeksConsumed, todaysDrinks } from '../util/database';
import * as SplashScreen from 'expo-splash-screen';
import TodayAnalytic from '../components/TodayAnalytic';

SplashScreen.preventAutoHideAsync();



export default function TodayDrink() {

  const [units, setUnits] = useState(0);
  const [drinks, setDrinks] = useState(null);


  const isFocused = useIsFocused();

  async function removeDrink(id){
    await deleteDrink(id, drinks);
    const units = await thisWeeksConsumed();
    const today = await todaysDrinks();
    setUnits(units.vol);
    setDrinks(today);
  }

    useEffect(()=>{
      async function helper(){ 
        const units = await thisWeeksConsumed();
        const today = await todaysDrinks((new Date()).toISOString().substring(0,10));
        setUnits(units.vol);
        setDrinks(today);
        
      }

      helper();
    }, [isFocused]);
    
       
    if(drinks != null){
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
            <DrinkAnalytics units={units}></DrinkAnalytics>
            <TodayAnalytic alc={drinks.alchohol}></TodayAnalytic>
            <DrinkList drinks={drinks.drinks} onPress={removeDrink}></DrinkList>
        </View>
      )
    }else{
      return
    }

  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalConstants.colors.darkBlue,
    borderTopWidth: 3,
    borderColor: 'black'
  }
})
