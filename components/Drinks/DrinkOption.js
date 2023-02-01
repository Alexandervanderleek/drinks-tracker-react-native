import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalConstants } from '../../util/constants'
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import PlusMinus from '../PlusMinus';

export default function DrinkOption({name,volume,strength, icon}) {
    
    let IconComponent;



    switch (icon.provider) {
        case 'MaterialCommunityIcons':
            IconComponent = <MaterialCommunityIcons name={icon.name} size={48} color="black" />
            break;
        
        case 'Ionicons':
            IconComponent = <Ionicons name={icon.name} size={48} color="black" />
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
            <Text style={{fontWeight: 'bold'}} >{name}</Text>
            <Text style={{fontWeight: 'bold'}} >{volume} ml</Text>
            <Text style={{fontWeight: 'bold'}} >{strength}%</Text>
            <Text style={{fontWeight: 'bold'}}>{Math.round(volume*(strength/100))/10} units</Text>
        </View>
        <PlusMinus></PlusMinus>


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