import React from 'react'
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalConstants } from '../../util/constants';
import { MaterialIcons } from '@expo/vector-icons';

export default function Adrink({item}) {
  
    let IconComponent;

    function addThisDrink(quantity){

        const today = (new Date()).toISOString();


        newDrink({
            id: item.id,
            name: item.name,
            icon: item.icon,
            provider: item.provider,
            strength: item.strength,
            volume: item.volume,
            quantity: quantity,
            date: today.substring(0,10)
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
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 18}} >{item.name}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 14}} >{`x${item.quantity}`}</Text>
            </View>
           
            
            <View>
                <Text style={{fontWeight: 'bold'}} >{item.volume} ml</Text>
                <Text style={{fontWeight: 'bold'}} >{item.strength}%</Text>
                <Text style={{fontWeight: 'bold'}}>{Math.round(item.volume*(item.strength/100))/10} units</Text>
            </View>
            
        </View>

        <View style={styles.quanityChange}>
            <Pressable>
                <View style={styles.buttonThing}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                        DELETE 1
                    </Text>
                    <MaterialIcons name="delete" size={24} color="white" />
                </View>
            </Pressable>
        </View>
        


    </View>
   
  )
  
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: GlobalConstants.colors.LightBlue,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 8,
        flexDirection: 'row'
    },
    iconContainer:{
        justifyContent: 'center'
    }
    ,
    infoContainer:{
        flex: 3,      
        flexDirection:'row',  
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    quanityChange:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonThing:{
        flexDirection: 'row',
         
         
          alignItems: 'center',
          backgroundColor: '#BC2020',
          padding: 6,
          borderRadius: 8
        }
    
    
})
