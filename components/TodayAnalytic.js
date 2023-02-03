import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalConstants } from '../util/constants'

export default function TodayAnalytic({alc}) {
  return (
    <View style={{marginHorizontal: 10, alignItems: 'center',backgroundColor: GlobalConstants.colors.LightBlue, borderColor: 'black',borderWidth: 2,
    padding: 8, marginBottom: 4,
    borderRadius: 8,}}>
        <Text style={styles.title}>{`TODAY'S SUMMARY : ${alc.toFixed(1)} units / ${(alc*10).toFixed(1)} ml`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    title:{
        // backgroundColor: GlobalConstants.colors.LightBlue,
        // padding: 8,
        // borderRadius: 8,
        fontWeight: 'bold',
        fontSize: 18
    }
})
