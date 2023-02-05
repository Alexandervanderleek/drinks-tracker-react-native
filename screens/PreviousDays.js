import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { GlobalConstants } from '../util/constants'
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../components/Button';
import { deleteDrink, todaysDrinks } from '../util/database';
import DrinksList from '../components/Drinks/DrinksList';
import IconButton from '../components/IconButton';
import { useIsFocused } from '@react-navigation/native';


export default function PreviousDays({navigation}) {
    

    
    const today = new Date();
    const thirtyAgo = new Date();
    today.setDate(today.getDate() - 1)
    thirtyAgo.setDate(today.getDate()-28);

    const [formatDate, setFormated] = useState(today.toISOString().slice(0,10))
    const [date, setDate] = useState(today);
    const [show, setShow] = useState(false);
    const [drinks, setDrinks] = useState([])
    
    const isFocused = useIsFocused();

    async function removeDrink(id){
        await deleteDrink(id, drinks);
        
        const today = await todaysDrinks(formatDate);
        setDrinks(today);
      }

      

    useEffect(()=>{
        async function helper(){
            const drinks = await todaysDrinks(formatDate);
            setDrinks(drinks);
            navigation.setOptions({
                headerRight: ({tintColor}) => (
                    <IconButton icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate("AddDrink",{date: formatDate})}}></IconButton>
                  ),
            })
        }
        helper();
    },[formatDate,navigation, isFocused])

    const onChange = (event, selectedDate) => {
        setShow(false) 
        if (event.type == 'set') {
            const currentDate = selectedDate;
            let tempDate = new Date(currentDate);
            let fDate = tempDate.toISOString().slice(0,10)
            setFormated(fDate);
            setDate(currentDate);
        }
    }

    if(typeof(drinks.drinks) === "undefined"){
        return(
            <View style={[styles.outerContainer,{justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator size={"large"}>

                </ActivityIndicator>

            </View>
        )
    }

    
    return (
    <View style={styles.outerContainer}>
        <View style={styles.dateContainer}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24, margin: 8 }}>DRINKS FOR {formatDate}</Text>
            <Button style={{marginBottom: 12}} onPress={()=>{setShow(true)}}>Select Different Date</Button>
         { show && <DateTimePicker 
           testID="dateTimePicker"
           value={date}
          mode={'date'}
          minimumDate={thirtyAgo}
          maximumDate={today}
          is24Hour={true}
          onChange={onChange}></DateTimePicker> 
          } 
        </View>
        <View style={ {flex: 1}}>
            {drinks.drinks.length>0 && <DrinksList drinks={drinks.drinks} onPress={removeDrink}></DrinksList>}
            {drinks.drinks.length<1 &&
            <View  style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold',color: 'white',fontSize: 18}}>No Drinks On This Day.</Text>
                <Text style={{fontWeight: 'bold',color: 'white',fontSize: 18}}>Add Drinks by clicking the plus</Text>
            </View>}
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    outerContainer:{
        backgroundColor: GlobalConstants.colors.darkBlue,
        flex: 1,
        padding: 8,
        borderTopColor: 'black',
        borderTopWidth: 3
    },
    dateContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
        borderBottomWidth: 2,
        borderColor: 'white',
        marginBottom: 6
    }
})
