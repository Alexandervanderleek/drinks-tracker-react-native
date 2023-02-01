import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { GlobalConstants } from '../../util/constants';
import InfoText from '../util/InfoText';

export default function DrinkAnalytics() {
  return (
    <View style={styles.container}>
        <View >
            <CircularProgress
                value={10}
                maxValue={14}
                radius={100}
                duration={1000}
                valueSuffix={"/14"}
                progressValueColor={GlobalConstants.colors.LightBlue}
                progressValueFontSize={24}
                titleFontSize={16}
                title={"units consumed"}
                titleColor={GlobalConstants.colors.LightBlue}
                titleStyle={{ fontWeight: 'bold' }}
                circleBackgroundColor={GlobalConstants.colors.darkBlue}
                activeStrokeColor={'cyan'}
                // activeStrokeSecondaryColor={'#C3305D'}
                inActiveStrokeColor={'white'}
                progressFormatter={(value) => {
                    'worklet';
                    
                    return value.toFixed(2); // 2 decimal places
                }}
            />
        </View>
        <View style={styles.infoContainer}>
                <InfoText dataInput={"14 units"}>Weekly Allowance:</InfoText>
                <InfoText dataInput={"34 ml"}>Alchohol consumed:</InfoText>
        </View>
       
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderRadius: 12,
        paddingVertical: 8,
        paddingLeft: 8,
        marginVertical: 24,
        marginHorizontal: 12,
        
        backgroundColor: GlobalConstants.colors.LightBlue

    },
    infoContainer:{
        height: '100%',
        flex: 1
    }
})
