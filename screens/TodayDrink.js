import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DrinkAnalytics from '../components/Drinks/DrinkAnalytics'
import DrinkList from '../components/Drinks/DrinksList';
import { GlobalConstants } from '../util/constants'

export default function TodayDrink() {
  return (
    <View style={styles.container}>
        <DrinkAnalytics></DrinkAnalytics>
        <DrinkList></DrinkList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalConstants.colors.darkBlue
  }
})
