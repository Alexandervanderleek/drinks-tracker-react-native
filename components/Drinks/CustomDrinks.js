import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalConstants } from '../../util/constants'
import { MaterialIcons} from '@expo/vector-icons'
import PlusMinus from '../PlusMinus';
import Button from '../Button';

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

 
  
    return (
   
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <View  style={styles.infoBox}>
                <Button style={{borderColor: 'black',borderWidth: 2, borderRadius: 12}}>
                    EDIT
                </Button>
            </View>
        
        
            {/* <Text style={{fontWeight: 'bold', fontSize: 18}} >Custom</Text>
            <Text style={{fontWeight: 'bold'}} > ml</Text>
            <Text style={{fontWeight: 'bold'}} >%</Text>
            <Text style={{fontWeight: 'bold'}}> units</Text> */}
            <View style={styles.infoBox}>
                <Text style={styles.titleBox}>Name</Text>
                <Text></Text>
            </View>
            <View  style={styles.infoBox}>
                <Text style={styles.titleBox}>Volume</Text>
    
            </View>
            <View  style={styles.infoBox}>
                <Text style={styles.titleBox}>Strength</Text>
                
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
    }
    
})
