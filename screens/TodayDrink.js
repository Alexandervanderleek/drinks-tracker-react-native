import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {  StyleSheet, View } from 'react-native'
import DrinkAnalytics from '../components/Drinks/DrinkAnalytics'
import DrinkList from '../components/Drinks/DrinksList';
import { GlobalConstants } from '../util/constants'
import { thisWeeksConsumed, todaysDrinks } from '../util/database';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();



export default function TodayDrink() {

  const [units, setUnits] = useState(0);
  const [drinks, setDrinks] = useState(null);

  const isFocused = useIsFocused();


    useEffect(()=>{
      async function helper(){
        const units = await thisWeeksConsumed();
        const today = await todaysDrinks();
        setUnits(units.vol);
        setDrinks(today);
        
      }

      helper();
      console.log("using the effect done")
    }, [isFocused]);
    
       
    if(drinks != null){
      console.log("our drinks are " +JSON.stringify(drinks))
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
            <DrinkAnalytics units={units}></DrinkAnalytics>
            <DrinkList drinks={drinks}></DrinkList>
        </View>
      )
    }else{
      return
    }

  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalConstants.colors.darkBlue
  }
})
