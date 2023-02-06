import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View,Keyboard, Alert } from 'react-native'
import { GlobalConstants } from '../util/constants'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { terminate } from '../util/database';

export default function Settings() {

  const [allowance, setAllowance] = useState("");
  const [textValue, setTextValue] = useState("");
  const isFocused = useIsFocused();

  Number.prototype.toFixedNoRounding = function(n) {
    const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
    const a = this.toString().match(reg)[0];
    const dot = a.indexOf(".");
    if (dot === -1) { // integer, insert decimal dot and pad up zeros
        return a + "." + "0".repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? (a + "0".repeat(b)) : a;
 }

  useEffect(()=>{

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {

        const noSpaces = textValue.replace(" ","");
        
        const commas = noSpaces.match(/,/g);
        const points = noSpaces.match(/\./g);
        const hasNegative = noSpaces.indexOf("-");
        
        if(  commas?.length>1 || points?.length>1 || hasNegative>-1 ||(commas != null && points != null) || noSpaces[0] === "," || noSpaces[0] === "." ){
          Alert.alert("Invalid Number", "reseting limit to original");
          setTextValue(allowance);
        }else{
          if(Number.parseInt(noSpaces)>999){
            Alert.alert("Number too large","Please keep unit limit below 999")
            setTextValue(allowance);
          }else{

            parseFloat(noSpaces).toFixedNoRounding(1).toString();
            setAllowance(parseFloat(noSpaces).toFixedNoRounding(1).toString());
            setTextValue(parseFloat(noSpaces).toFixedNoRounding(1).toString());
            AsyncStorage.setItem("UNITS",parseFloat(noSpaces).toFixedNoRounding(1).toString());
          }

        }



    });

    return () => {
      hideSubscription.remove();
    };
  })

  useEffect(()=>{
    
    async function helper(){
      const units = await AsyncStorage.getItem("UNITS");
      setAllowance(units);
      setTextValue(units);
    }
    helper();
  },[isFocused])


  function deleteAll(){
    Alert.alert(
      'Warning',
      'You are about to delete all stored drinks.\nAre you sure you want to proceed ?',
      [
        {
          text: 'Confirm',
          onPress: async () => {
            terminate().then(()=>{
              Alert.alert('All Drinks deleted')
            })
           
          },
          style: 'default ',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  
  }
    

  return (
    <View style={styles.outerContainer}>
       <View style={styles.unitsInput}>
          <Text style={styles.textTitle}>Unit Allowance:</Text>
          <TextInput style={styles.inputStyle} keyboardType='decimal-pad' inputMode='decimal' value={textValue}  onChangeText={(text)=>{
            setTextValue(text)
          }}>

          </TextInput>
       </View>
       <View>
        <Button style={{margin: 12}} onPress={deleteAll}>Clear All Drinks</Button>
       </View>
       
    </View>
  )
}


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: GlobalConstants.colors.darkBlue,
    borderTopColor: 'black',
    borderTopWidth: 3,
    justifyContent: 'flex-start'
  },
  unitsInput: {
    flexDirection: 'row',
    margin: 12,
    marginTop: 20,
    backgroundColor: GlobalConstants.colors.LightBlue,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  textTitle:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    flex: 1
  },
  inputStyle:{
    backgroundColor: 'white',
    flex: 1,
    fontSize: 18,
    padding: 4,
    borderRadius: 6,
    fontWeight: 'bold'
  }
})
