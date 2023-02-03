import React from 'react'
import { Text, View } from 'react-native'

export default function InfoText({children, dataInput}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 17}}>
            {children}
        </Text>
        <Text style={{fontWeight: 'bold',fontSize: 18}}>
            {dataInput}
        </Text>

    </View>
  )
}

