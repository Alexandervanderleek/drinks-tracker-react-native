import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalConstants } from '../../util/constants'
import { MaterialIcons} from '@expo/vector-icons'
import PlusMinus from '../PlusMinus';
import Button from '../Button';
import NumericInput from 'react-native-numeric-input'


export default function CustomDrinks() {

    function addThisDrink(quantity){

       


        newDrink({
            id: item.id,
            name: item.name,
            icon: item.icon,
            provider: item.provider,
            strength: item.strength,
            volume: item.volume,
            quantity: quantity,
            date: date
        })
    }

    const [visible, setIsVisible] = useState(false);
    const [name, setName] = useState( "negroni");
    const [volume, setVolume] = useState( 30);
    const [strength, setStrength] = useState( 12);
  
    return (
   
    <View style={styles.container}>
        <Modal
            visible={visible}
        >
            <View style={styles.modalBack}>
                <View style={styles.modalInput}>
                    <Text style={styles.modalText}>Name:</Text>
                    <TextInput value={name} onChangeText={(text)=>{setName(text)}} style={{minWidth: 225,color: '#EA3788',fontSize:24,fontWeight: 'bold', borderBottomColor: '#EA3788', borderBottomWidth: 2}}></TextInput>
                </View>
                <View style={styles.modalInput}>
                    <Text style={styles.modalText}>Volume:</Text>
                    <NumericInput 
                        value={volume} 
                        onChange={value => setVolume(value)} 
                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={240} 
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
                        totalWidth={240} 
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
            <View  style={styles.infoBox}>
                <Button style={{borderColor: 'black',borderWidth: 2, borderRadius: 12}} onPress={()=>{setIsVisible(true)}}>
                    EDIT
                </Button>
                
            </View>
        
            <View style={styles.infoBox}>
                <Text style={styles.titleBox}>Name</Text>
                <Text style={{fontWeight: 'bold'}}>{name}</Text>
            </View>
            <View  style={styles.infoBox}>
                <Text style={styles.titleBox}>Volume</Text>
                <Text style={{fontWeight: 'bold'}}>{volume+" ml"}</Text>
    
            </View>
            <View  style={styles.infoBox}>
                <Text style={styles.titleBox}>Strength</Text>
                <Text style={{fontWeight: 'bold'}}>{strength+ " %"}</Text>
                
            </View>
           
            
        </View>
        <View style={{flexDirection: 'row'}}>
           
           <PlusMinus newDrink={addThisDrink}></PlusMinus>
        </View>


    </View>
   
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: GlobalConstants.colors.LightBlue,
        borderRadius: 12,
        margin: 8,
        padding: 8,
    },
    iconContainer:{
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
    ,
    infoContainer:{
        flex: 1,        
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2
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
