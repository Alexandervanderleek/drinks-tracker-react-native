import TodayDrink from './screens/TodayDrink';
import Analytics from './screens/Analytics';
import Settings from './screens/Settings';
import AddDrinks from './screens/AddDrinks';
import IconButton from './components/IconButton';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalConstants } from './util/constants';
import { initDb } from './util/database';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import PreviousDays from './screens/PreviousDays';


const BottomTab = createBottomTabNavigator();
const stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  

  const [dbInited, setDbInited] = useState(false);

  useEffect(()=>{

    async function helper(){
      
        const units = await AsyncStorage.getItem('UNITS');
        if(!units){
          await AsyncStorage.setItem('UNITS', "14");
        }
    }
    helper()
    initDb().then(()=>{
        setDbInited(true);
    })
  },[])

  if(dbInited){
    SplashScreen.hideAsync();
  }

  if(!dbInited){
    return null;
  }

  
  function DrinksOverview(){
    return <BottomTab.Navigator screenOptions={{
      headerStyle: {backgroundColor: GlobalConstants.colors.LightBlue,
      },
      headerTintColor: 'black',
      tabBarStyle: {
        backgroundColor: GlobalConstants.colors.LightBlue,
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: GlobalConstants.colors.weirdGreen,
      tabBarHideOnKeyboard: true
    }}>

      {/* Today's drinks componenet */}
      <BottomTab.Screen name="TodaysDrinks" component={TodayDrink} options={({navigation})=>({
        title: 'Todays Drinks',
        tabBarIcon: ({color, size})=>(
          <Ionicons name="today" size={size} color={color} />
        )
        ,
        headerRight: ({tintColor})=>(
        <IconButton icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate("AddDrink")}}></IconButton>
      )
      })}></BottomTab.Screen>

      <BottomTab.Screen name="PastDrinks" component={PreviousDays} options={({navigation})=>({
        title: 'Past Drinks',
        tabBarIcon: ({color, size})=>(
          <Ionicons name="beer-sharp" size={size} color={color} />
        )
       
      })}></BottomTab.Screen>

      {/* Analytics screen component */}
      <BottomTab.Screen name="Analytics" component={Analytics} options={{
        title: 'Analytics',
        tabBarIcon: ({color, size})=>(
          <Ionicons name="analytics-sharp" size={size} color={color} />
        )
        ,
      }}></BottomTab.Screen>

      {/* Settings screen component */}
      <BottomTab.Screen name="Settings" component={Settings} options={{
        title: 'Settings',
        tabBarIcon: ({color, size})=>(
          <Ionicons name="settings" size={size} color={color} />
        )
        ,
      }}></BottomTab.Screen>

     

    </BottomTab.Navigator>
  }
  
  
  return (
    
    <>
    <StatusBar style='dark'></StatusBar>
    <NavigationContainer>
      <stack.Navigator>
        
        <stack.Screen name="drinksOverview" component={DrinksOverview} options={{
          headerShown: false,
        }}></stack.Screen>
        
        <stack.Screen name="AddDrink" component={AddDrinks} options={{
          presentation: 'modal',
          headerStyle:{ backgroundColor: GlobalConstants.colors.LightBlue},
          headerTintColor: 'black',
          

          
        }}>

        </stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
    </>


  );
}


