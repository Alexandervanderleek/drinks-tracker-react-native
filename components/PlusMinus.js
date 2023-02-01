import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons} from '@expo/vector-icons'
import { GlobalConstants } from '../util/constants'


export default function PlusMinus({newDrink}) {

  const [quantity, setQuantity] = useState(0);



  function addItemHandler(){
    newDrink(quantity+1)
    setQuantity(quantity+1);
  }

  function removeItemHandler(){
    if(quantity>0){
        newDrink(quantity-1);
        setQuantity(quantity-1);
    }
  }

  return (
    <View style={styles.buttonContainer}>
        <Pressable onPress={addItemHandler} style={({pressed})=>[pressed && styles.pressed, styles.NumberValue]}>
            
                <Ionicons name='add-circle' size={64} color={GlobalConstants.colors.darkBlue}></Ionicons>
            
        </Pressable>
        <View style={styles.NumberValue}>
            <Text style={{fontWeight: 'bold',fontSize: 24}}>
                {quantity}
            </Text>
        </View>
        <Pressable onPress={removeItemHandler} style={({pressed})=>[pressed && styles.pressed,styles.NumberValue]}>
            
                <Ionicons name='remove-circle' size={64} color={GlobalConstants.colors.darkBlue}></Ionicons>
            
        </Pressable>
</View>
  )
}

const styles = StyleSheet.create({
    buttonContainer:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    pressed:{
        opacity: 0.7
    },
    NumberValue:{
        justifyContent: 'center'
    }
})
