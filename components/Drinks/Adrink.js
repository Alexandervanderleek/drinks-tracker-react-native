import React from 'react'
import { MaterialCommunityIcons, Ionicons, MaterialIcons} from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalConstants } from '../../util/constants';

export default function Adrink({item, onPress}) {
  
    let IconComponent;

    switch (item.provider) {
        case 'MaterialCommunityIcons':
            IconComponent = <MaterialCommunityIcons name={item.icon} size={58} color="black" />
            break;
        
        case 'Ionicons':
            IconComponent = <Ionicons name={item.icon} size={58} color="black" />
            break;
        case 'MaterialIcons':
            IconComponent = <MaterialIcons name={item.icon} size={58} color="black" />
            break;
        case 'FontAwesome5':
            IconComponent = <FontAwesome5  name={item.icon} size={58} color="black" />
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
            <Pressable onPress={onPress.bind(this, item.id)} style={({pressed})=>[pressed && styles.pressed]}>
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
    },
    pressed:{
        opacity: 0.75
    }

    
    
})
