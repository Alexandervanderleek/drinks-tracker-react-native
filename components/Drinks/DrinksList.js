import React from 'react'
import { Button, View } from 'react-native'
import { todaysDrinks } from '../../util/database';

export default function DrinksList() {

  async function getDrinks(){
    const drinks  = await todaysDrinks();
    console.log(JSON.stringify(drinks));
  }

  return (
    <View>
        <Button onPress={getDrinks} title="test"></Button>
    </View>
  )
}
