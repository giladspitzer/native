import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Menu from './menuComponent';
import Home from './homeComponent'
import DishDetail from './dishDetailComponent';
import { View, Platform, useWindowDimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
                name="DishDetail"
                component={ DishDetail }
            />
        </MenuNavigator.Navigator>
    )
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
      initialRouteName={Home}
      drawerContentOptions={{
        itemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={ Home }
      />
      <Drawer.Screen
        name="Menu"
        component={ MyStack }
      />
      
    </Drawer.Navigator>
  );
}


class Main extends Component {

  render() {
 
    return (
        <View style={{flex:1}}>
            <NavigationContainer>
                <MyDrawer />
            </NavigationContainer>
        </View>
    );
  }
}
  
export default Main;