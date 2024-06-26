import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {  StyleSheet, View } from 'react-native'
import DrinkAnalytics from '../components/Drinks/DrinkAnalytics'
import DrinkList from '../components/Drinks/DrinksList';
import { GlobalConstants } from '../util/constants'
import { deleteDrink, thisWeeksConsumed, todaysDrinks } from '../util/database';
import * as SplashScreen from 'expo-splash-screen';
import TodayAnalytic from '../components/TodayAnalytic';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();



export default function TodayDrink() {

  const [units, setUnits] = useState(0);
  const [drinks, setDrinks] = useState(null);
  const [limitUnits, setLimitUnits] = useState("14");

  const thisDate = (new Date()).toISOString().substring(0,10)

  const isFocused = useIsFocused();

  async function removeDrink(id){
    await deleteDrink(id, drinks);
    const units = await thisWeeksConsumed();
    const today = await todaysDrinks(thisDate);
    setUnits(units.vol/100);
    setDrinks(today);
  }

    useEffect(()=>{


      async function helper(){ 
        const units = await thisWeeksConsumed();
        const today = await todaysDrinks(thisDate);
        const limitUnits  = await AsyncStorage.getItem("UNITS");
        setLimitUnits(limitUnits);
        setUnits(units.vol/100);
        setDrinks(today);
      }

      helper();
     
    }, [isFocused]);
    
       
    if(drinks != null){
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
            <DrinkAnalytics units={units} limitUnits={limitUnits}></DrinkAnalytics>
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
