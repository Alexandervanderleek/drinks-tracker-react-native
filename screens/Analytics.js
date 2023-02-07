import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GlobalConstants } from '../util/constants'
import { unitsCalculations } from '../util/database'
import { useIsFocused } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;



export default function Analytics() {

  const [units, setUnits] = useState();
  const isFocused = useIsFocused();
  
  useEffect(()=>{
    async function helper(){
      const past30 = await unitsCalculations();
      const days = [];
      for(let i = 0; i<30;i++){
        var d = new Date();
        d.setDate(d.getDate()-i);
        const dateFormated = d.toISOString().substring(0,10);
        const index = past30.findIndex((item)=>{ return item.day === dateFormated})
        if(index>-1){
          days.push(past30[index].total/10)
         }else{
           days.push(0)
         }
        
      }
      
      setUnits(days)
    }

    helper();
  }, [isFocused])



  if(typeof units === "undefined"){
    return (
      <View style={[styles.outerContainer, {justifyContent: 'center', alignContent:'center'}]}>
           <ActivityIndicator size="large">

          </ActivityIndicator>
      </View>
     
    )
  }

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color:(opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = {
    labels: ["1", "2", "3", "4", "5", "6","7"],
    datasets: [
      {
         data: [units[0],units[1],units[2],units[3],units[4],units[5],units[6]], //units.splice(0,7),
        color: () => `rgba(255, 255, 255, 0)`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };

  const data1 = {
    labels:["1","5","10","15","20","25","30"],
    datasets: [
      {
        data: units,
        color: () => `rgba(255, 255, 255, 0)`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };


  
  return (
   <View style={styles.outerContainer}>

    <ScrollView>
    <View style={{ alignItems: 'center', marginTop: 12, flex: 1}}>
      <Text style={{fontWeight: 'bold',color: 'white', fontSize: 24}}>Past 7 Days Units Consumed</Text>
      <LineChart
          style={{borderWidth: 2, borderColor: 'white', borderRadius: 8}}
          data={data}
          width={screenWidth-20}
          height={256}
          chartConfig={chartConfig}
          bezier
        />
    </View>

    <View style={{ alignItems: 'center',marginTop: 12, flex:1}}>
      <Text style={{fontWeight: 'bold',color: 'white', fontSize: 24}} >Past 30 Days Units Consumed</Text>
      <LineChart
          style={{borderWidth: 2, borderColor: 'white', borderRadius: 8}}
          data={data1}
          width={screenWidth-20}
          height={256}
          chartConfig={chartConfig}
          bezier
        />
    </View>
    </ScrollView>
   </View>
  )
}


const styles = StyleSheet.create({
  outerContainer:{
    backgroundColor: GlobalConstants.colors.darkBlue,
    flex: 1,
    borderTopColor: 'black',
    borderTopWidth: 3,
    justifyContent: 'flex-start'
  }
})
