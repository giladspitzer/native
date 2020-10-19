import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Menu from './menuComponent';
import Home from './homeComponent'
import Contact from './contactComponent'
import About from './aboutComponent'
import DishDetail from './dishDetailComponent';
import { View, Platform, useWindowDimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contact" component={Contact} />
      <Tab.Screen name="About" component={ About }/>
    </Tab.Navigator>
  );
}

const MenuNavigator = createStackNavigator();

function MyStack(){
    return(
        <MenuNavigator.Navigator initialRouteName="Menu" headerMode="screen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E3EFFF',
                },
                headerTintColor: '#007aff',
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
                name="Home"
                component={ Home }
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
      
      <Drawer.Screen
        name="Other"
        component={MyTabs }
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