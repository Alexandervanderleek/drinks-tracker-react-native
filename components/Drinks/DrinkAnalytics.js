import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CircularProgress, { ProgressRef }  from 'react-native-circular-progress-indicator'
import { GlobalConstants } from '../../util/constants';
import InfoText from '../util/InfoText';




export default function DrinkAnalytics({units, limitUnits}) {
    if(!units){
        units = 0;
    }

    const [max, setMax] = useState("14");

    if(max!=limitUnits){
        console.log("setting")
        setMax(limitUnits);
    }

    

  return (
    <View style={styles.outerContainer}>
        <View style={styles.theTitle}>
            <Text style={{marginBottom: 2 ,borderBottomColor: 'black',borderBottomWidth: 2,color:'black', fontWeight: 'bold',fontSize: 16}} >- THIS WEEKS SUMMARY -</Text>
        </View>
    
    <View style={styles.innerContainer}>
        <View >
           
            <CircularProgress
                value={((units/10)/limitUnits)*100}
                showProgressValue={false}
                maxValue={100}
                radius={60}
                duration={1000}
                valueSuffix={`${units/10}/${limitUnits}`}
                strokeLinecap={'square'}
                progressValueColor={GlobalConstants.colors.LightBlue}
                progressValueFontSize={16}
                subtitle={"units"}
                subtitleColor={GlobalConstants.colors.LightBlue}
                titleFontSize={16}
                title={`${(units/10).toFixed(1)}/${limitUnits}`}
                titleColor={GlobalConstants.colors.LightBlue}
                titleStyle={{ fontWeight: 'bold' }}
                circleBackgroundColor={GlobalConstants.colors.darkBlue}
                activeStrokeColor={'cyan'}
                // activeStrokeSecondaryColor={'#C3305D'}
                inActiveStrokeColor={'white'}
                progressFormatter={(value) => {
                    'worklet';
                    
                    return value.toFixed(1); // 2 decimal places
                }}
            />
             
        </View>
        <View style={styles.infoContainer}>
                <InfoText dataInput={`${limitUnits} units`}>Weekly Allowance:</InfoText>
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
