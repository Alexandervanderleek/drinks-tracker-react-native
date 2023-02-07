import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalConstants } from '../../util/constants'

import PlusMinus from '../PlusMinus';
import Button from '../Button';
import NumericInput from 'react-native-numeric-input'


export default function CustomDrinks({date, newDrink}) {

   

    const [visible, setIsVisible] = useState(false);
    const [name, setName] = useState( "Negroni");
    const [volume, setVolume] = useState(100);
    const [strength, setStrength] = useState(24);


    function addThisDrink(quantity){

        newDrink({
            id: name+volume+strength,
            name: name,
            icon: "folder-special",
            provider: 'MaterialIcons',
            strength: strength,
            volume: volume,
            quantity: quantity,
            date: date
        })
    }
  
    return (
   
    <View style={styles.container}>
        <Modal
            visible={visible}
        >
            <View style={styles.modalBack}>
                <View style={styles.modalInput}>
                    <Text style={styles.modalText}>Name:</Text>
                    <TextInput value={name} onChangeText={(text)=>{setName(text)}} style={{minWidth: 200,color: '#EA3788',fontSize:24,fontWeight: 'bold', borderBottomColor: '#EA3788', borderBottomWidth: 2}}></TextInput>
                </View>
                <View style={styles.modalInput}>
                    <Text style={styles.modalText}>Volume:</Text>
                    <NumericInput 
                        value={volume} 
                        onChange={value => setVolume(value)} 
                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={200} 
                        totalHeight={50} 
                        iconSize={25}
                        step={10}
                        minValue={10}
                        maxValue={1000}
                        valueType='real'
                        rounded 
                        textColor='#B0228C' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#EA3788' 
                        leftButtonBackgroundColor='#E56B70'/>
                </View>
                <View style={styles.modalInput}>
                    <Text style={styles.modalText}>Strength:</Text>
                    <NumericInput 
                        value={strength} 
                        onChange={value => setStrength(value)} 
                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={200} 
                        totalHeight={50} 
                        iconSize={25}
                        step={0.5}
                        maxValue={100}
                        minValue={0.5}
                        valueType='real'
                        rounded 
                        textColor='#B0228C' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#EA3788' 
                        leftButtonBackgroundColor='#E56B70'/>
                </View>
                <Button onPress={()=>{setIsVisible(false)}} style={{margin: 12}}>CONFIRM</Button>
            </View>
            
        </Modal>

        <View style={styles.iconContainer}>
             <Button style={{borderColor: 'black',borderWidth: 2, borderRadius: 12}} onPress={()=>{setIsVisible(true)}}>
                    EDIT
                </Button>
        </View>
        <View style={styles.infoContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 14}} >{name}</Text>
            <Text style={{fontWeight: 'bold'}} >{volume} ml</Text>
            <Text style={{fontWeight: 'bold'}} >{strength}%</Text>
            <Text style={{fontWeight: 'bold'}}>{Math.round(volume*(strength/100))/10} units</Text>
        </View>
        <PlusMinus newDrink={addThisDrink}></PlusMinus>


    </View>
   
  )
}


const styles = StyleSheet.create({  
    container:{
        backgroundColor: GlobalConstants.colors.LightBlue,
        borderRadius: 12,
        margin: 8,
        padding: 8,
        flexDirection: 'row'
    },
    iconContainer:{
        justifyContent: 'center'
    }
    ,
    infoContainer:{
        flex: 1,        
        alignItems: 'center'
    },  
    infoBox:{
        flex: 1,
        alignItems: 'center'
    },
    titleBox:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    modalBack:{
        flex:1,
        backgroundColor: GlobalConstants.colors.darkBlue,
        
    },
    modalInput:{
        flexDirection: 'row',
        padding: 8,
        margin: 8,
        marginTop: 20,
        justifyContent: 'space-around'
    },
    modalText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        textAlignVertical: 'center'
    }
    
})
