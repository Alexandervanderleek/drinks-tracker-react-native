import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { GlobalConstants } from '../../util/constants';
import InfoText from '../util/InfoText';

export default function DrinkAnalytics({units}) {


  return (
    <View style={styles.outerContainer}>
        <View style={styles.theTitle}>
            <Text style={{marginBottom: 2 ,borderBottomColor: 'black',borderBottomWidth: 2,color:'black', fontWeight: 'bold',fontSize: 16}} >- THIS WEEKS SUMMARY -</Text>
        </View>
    
    <View style={styles.innerContainer}>
        <View >
            <CircularProgress
                value={units/10}
                maxValue={14}
                radius={80}
                duration={1000}
                valueSuffix={"/14"}
                strokeLinecap={'square'}
                progressValueColor={GlobalConstants.colors.LightBlue}
                progressValueFontSize={24}
                titleFontSize={14}
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
                <InfoText dataInput={`${units} ml`}>Alchohol consumed:</InfoText>
        </View>
       
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
    outerContainer:{
        borderRadius: 12,
        paddingVertical: 8,
        paddingLeft: 8,
        marginVertical: 12,
        marginHorizontal: 10,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: GlobalConstants.colors.LightBlue
    },
    innerContainer:{
        flexDirection: 'row',
        

    },
    infoContainer:{
        height: '100%',
        flex: 1
    },
    theTitle:{
        marginBottom: 4,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        

    }
})
