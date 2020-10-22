import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Menu from './menuComponent';
import Home from './homeComponent'
import Contact from './contactComponent'
import About from './aboutComponent'
import DishDetail from './dishDetailComponent';
import { ScrollView, View, useWindowDimensions, Image, StyleSheet, Text } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements'

const defaultScreenOptions = {
    headerStyle: {
        backgroundColor: '#E3EFFF',
    },
    headerTintColor: '#007aff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
  }


const drawerMenutButton = ({ navigation }) =>
({
  headerLeft: () => (    <Icon name='menu' size={24} color="white" onPress={() => navigation.toggleDrawer()}/>              )
})


export function CustomDrawerContentComponent({props}){
    console.log(props)
    return(
  <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <View>
            <DrawerItem
                label="Home"
                component={ HomeStack }
                options={{
                drawerIcon: ({ tintColor }) => (<Icon name='home' size={24} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
                }}
            />
        </View>
        
      
      </SafeAreaView>
    </ScrollView>
    )
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
                options={drawerMenutButton}
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
                options={drawerMenutButton}
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
                options={drawerMenutButton}
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
              options={drawerMenutButton}
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
                options={drawerMenutButton}
                />
            <MenuNavigator.Screen
                name="DishDetail"
                component={ DishDetail }
            />
        </MenuNavigator.Navigator>
    )
}

