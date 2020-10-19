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
import SafeAreaView from 'react-native-safe-area-view';

const defaultScreenOptions = {
  headerStyle: {
      backgroundColor: '#E3EFFF',
  },
  headerTintColor: '#007aff',
  headerTitleStyle: {
      fontWeight: 'bold',
  }
}


const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator headerMode="float">
      <Tab.Screen name="Contact" component={ Contact } />
      <Tab.Screen name="About" component={ About }/>
    </Tab.Navigator>
  );
}

const OtherNavigator = createStackNavigator();
function OtherStack(){
    return(
        <OtherNavigator.Navigator headerMode="screen" screenOptions={defaultScreenOptions}>
            <OtherNavigator.Screen
                name="Other"
                component={ MyTabs }
            />
        </OtherNavigator.Navigator>
    )
}

const AboutNavigator = createStackNavigator();
function AboutStack(){
    return(
        <AboutNavigator.Navigator headerMode="screen" screenOptions={defaultScreenOptions}>
            <AboutNavigator.Screen
                name="About"
                component={ About }
            />
        </AboutNavigator.Navigator>
    )
}

const ContactNavigator = createStackNavigator();
function ContactStack(){
    return(
        <ContactNavigator.Navigator headerMode="screen" screenOptions={defaultScreenOptions}>
            <ContactNavigator.Screen
                name="Contact"
                component={ Contact }
            />
        </ContactNavigator.Navigator>
    )
}

const HomeNavigator = createStackNavigator();
function HomeStack(){
  return(
      <HomeNavigator.Navigator headerMode="screen" screenOptions={defaultScreenOptions}>
          <HomeNavigator.Screen
              name="Home"
              component={ Home }
          />
      </HomeNavigator.Navigator>
  )
}

const MenuNavigator = createStackNavigator();
function MenuStack(){
    return(
        <MenuNavigator.Navigator initialRouteName="Menu" headerMode="screen" screenOptions={defaultScreenOptions}>
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
        component={ HomeStack }
      />
      <Drawer.Screen
        name="About Us"
        component={ AboutStack }
      />
      <Drawer.Screen
        name="Menu"
        component={ MenuStack }
      />
      <Drawer.Screen
        name="Contact Us"
        component={ ContactStack }
      /> 
      {/* <Drawer.Screen
        name="Other"
        component={ OtherStack }
      /> */}
    </Drawer.Navigator>
  );
}


class Main extends Component {

  render() {
 
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={{ backgroundColor: '#E3EFFF', flex: 1}}>
            <NavigationContainer>
                <MyDrawer />
            </NavigationContainer>
        </SafeAreaView>
    );
  }
}
  
export default Main;