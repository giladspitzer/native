import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Menu from './menuComponent';
import DishDetail from './dishDetailComponent';
import { View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Constants } from 'expo' 

const MenuNavigator = createStackNavigator();

function MyStack(){
    return(
        <MenuNavigator.Navigator initialRouteName="Menu" headerMode="screen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
    
        >
            <MenuNavigator.Screen
                name="Menu"
                component={ Menu }
            />
            <MenuNavigator.Screen
                name="Dish Detail"
                component={ DishDetail }
            />
        </MenuNavigator.Navigator>
    )
}

class Main extends Component {

  render() {
 
    return (
        <View style={{flex:1}}>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </View>
    );
  }
}
  
export default Main;