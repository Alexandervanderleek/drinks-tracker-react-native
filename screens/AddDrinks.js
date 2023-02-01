import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalConstants } from '../util/constants'
import DrinkOptions from '../components/Drinks/DrinkOptions'

export default function AddDrinks() {
  return (
    <View style={styles.container}>
     <DrinkOptions></DrinkOptions>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: GlobalConstants.colors.darkBlue
  }
})