import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalConstants } from '../../util/constants'
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import PlusMinus from '../PlusMinus';

export default function DrinkOption({item, newDrink, date}) {
    
    let IconComponent;

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

    switch (item.provider) {
        case 'MaterialCommunityIcons':
            IconComponent = <MaterialCommunityIcons name={item.icon} size={58} color="black" />
            break;
        
        case 'Ionicons':
            IconComponent = <Ionicons name={item.icon} size={58} color="black" />
            break;
    
        default:
            break;
    }
  
    return (
   
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            {IconComponent}
        </View>
        <View style={styles.infoContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 18}} >{item.name}</Text>
            <Text style={{fontWeight: 'bold'}} >{item.volume} ml</Text>
            <Text style={{fontWeight: 'bold'}} >{item.strength}%</Text>
            <Text style={{fontWeight: 'bold'}}>{Math.round(item.volume*(item.strength/100))/10} units</Text>
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
    
})