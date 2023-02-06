import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GlobalConstants } from '../util/constants'
import DrinkOptions from '../components/Drinks/DrinkOptions'



export default function AddDrinks({route}) {
  const {date} = route.params || {date: (new Date()).toISOString().slice(0,10)}
  const isToday = route.params ? false : true;
  return (
    <View style={styles.container}>
      <DrinkOptions date={date} isToday={isToday}></DrinkOptions>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: GlobalConstants.colors.darkBlue,
    borderTopColor: 'black',
    borderTopWidth: 3
  }
})