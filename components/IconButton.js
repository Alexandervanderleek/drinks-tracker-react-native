import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

export default function IconButton({icon, onPress, color, size}) {
  return (
    <Pressable  onPress={onPress} style={({pressed})=>{pressed&& styles.pressed}}>
        <View style={styles.button}>
            <Ionicons name={icon} color={color} size={size}></Ionicons>
        </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    button:{
        borderRadius: 24,
        backgroundColor: 'white',
        padding: 6,
        margin: 8,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.7,
    }
})
