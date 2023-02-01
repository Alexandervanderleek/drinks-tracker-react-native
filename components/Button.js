import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalConstants } from '../util/constants'

export default function Button({children, onPress, mode, style}) {
  return (
    <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat]}>
                <Text style={[styles.buttonText, mode==='flat' && styles.flatText]}>{children}</Text>
            </View>
        </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
   button: {
    borderRadius: 12,
    padding: 8,
    backgroundColor: GlobalConstants.colors.brightBlue
   },
   flat: {
    backgroundColor: 'transparent'
   },
   buttonText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
   },
   flatText: {
    color: 'white'
   },
   pressed: {
    opacity: 0.75,
    borderRadius: 4
   }
})
