import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import DrinkAnalytics from '../components/Drinks/DrinkAnalytics'
import DrinkList from '../components/Drinks/DrinksList';
import { GlobalConstants } from '../util/constants'
import { thisWeeksConsumed } from '../util/database';

export default function TodayDrink({navigation}) {

  const [units, setUnits] = useState(0);

    function updateAnalytics(newUnits){
      setUnits(units);
    }


    useEffect(()=>{
      const focusHandler = navigation.addListener('focus', () => {
        thisWeeksConsumed().then((res)=>{
          console.log("test")
          console.log(res.vol)
          setUnits(res.vol/10)
      })
    });
    return focusHandler;
       
    },[units, setUnits,navigation])

  return (
    <View style={styles.container}>
        <DrinkAnalytics units={units}></DrinkAnalytics>
        <DrinkList onAdd={updateAnalytics}></DrinkList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalConstants.colors.darkBlue
  }
})
