import TodayDrink from './screens/TodayDrink';
import Analytics from './screens/Analytics';
import Settings from './screens/Settings';
import AddDrinks from './screens/AddDrinks';
import IconButton from './components/IconButton';

import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalConstants } from './util/constants';

const BottomTab = createBottomTabNavigator();
const stack = createStackNavigator();


export default function App() {
  
  function DrinksOverview(){
    return <BottomTab.Navigator screenOptions={{
      headerStyle: {backgroundColor: GlobalConstants.colors.LightBlue,
      },
      headerTintColor: 'black',
      tabBarStyle: {
        backgroundColor: GlobalConstants.colors.LightBlue,
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: GlobalConstants.colors.weirdGreen
    }}>

      {/* Today's drinks componenet */}
      <BottomTab.Screen name="TodaysDrinks" component={TodayDrink} options={({navigation})=>({
        title: 'Todays Drinks',
        headerRight: ({tintColor})=>(
        <IconButton icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate("AddDrink")}}></IconButton>
      )
      })}></BottomTab.Screen>

      {/* Analytics screen component */}
      <BottomTab.Screen name="Analytics" component={Analytics} options={{
        title: 'Your Analytics',
      }}></BottomTab.Screen>

      {/* Settings screen component */}
      <BottomTab.Screen name="Settings" component={Settings} options={{
        title: 'Settings',
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


