import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Menu from './menuComponent';
import Home from './homeComponent'
import Contact from './contactComponent'
import About from './aboutComponent'
import DishDetail from './dishDetailComponent';
import Reservation from './reservationComponent';
import { ScrollView, View, useWindowDimensions, Image, StyleSheet, Text, Alert, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Favorites from './favoritesComponent';
import Login from './loginComponent';
import NetInfo from "@react-native-community/netinfo";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const defaultScreenOptions = {
  headerStyle: {
      backgroundColor: '#E3EFFF',
  },
  headerTintColor: '#007aff',
  headerTitleStyle: {
      fontWeight: 'bold',
  }
}

const CustomDrawerContentComponent = props => {
    return(
      <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
              <View style={{flex:1}}>
              <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
              </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const drawerMenutButton = ({ navigation }) =>
({
  headerLeft: () => (    <Icon name='menu' size={24} color="white" onPress={() => navigation.toggleDrawer()}/>              )
})



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

const LoginNavigator = createStackNavigator();
function LoginStack(){
    return(
        <LoginNavigator.Navigator headerMode="screen" screenOptions={defaultScreenOptions}>
            <LoginNavigator.Screen
                name="Login"
                component={ Login }
                options={drawerMenutButton}
                />
        </LoginNavigator.Navigator>
    )
}

const FavoritesNavigator = createStackNavigator();
function FavoritesStack(){
    return(
        <FavoritesNavigator.Navigator headerMode="screen" screenOptions={defaultScreenOptions}>
            <FavoritesNavigator.Screen
                name="Favorites"
                component={ Favorites }
                options={drawerMenutButton}
                />
        </FavoritesNavigator.Navigator>
    )
}

const ReservationNavigator = createStackNavigator();
function ReservationStack(){
    return(
        <ReservationNavigator.Navigator headerMode="screen" screenOptions={defaultScreenOptions}>
            <ReservationNavigator.Screen
                name="Reservation"
                component={ Reservation }
                options={drawerMenutButton}
                />
        </ReservationNavigator.Navigator>
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


const Drawer = createDrawerNavigator();
function MyDrawer(){
    const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={props => CustomDrawerContentComponent(props)}
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
      initialRouteName={Home}
      drawerContentOptions={{
        itemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Login"
        component={ LoginStack }
        options={{
          drawerIcon: ({ tintColor }) => (<Icon name='sign-in' size={24} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
        }}
      /> 
      <Drawer.Screen
        name="Home"
        component={ HomeStack }
        options={{
          drawerIcon: ({ tintColor }) => (<Icon name='home' size={24} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={ AboutStack }
        options={{
          drawerIcon: ({ tintColor }) => (<Icon name='info-circle' size={24} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={ MenuStack }
        options={{
          drawerIcon: ({ tintColor }) => (<Icon name='list' size={24} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ ContactStack }
        options={{
          drawerIcon: ({ tintColor }) => (<Icon name='address-card' size={22} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
        }}
      /> 
      <Drawer.Screen
        name="Reserve Table"
        component={ ReservationStack }
        options={{
          drawerIcon: ({ tintColor }) => (<Icon name='cutlery' size={24} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
        }}
      /> 
      <Drawer.Screen
        name="Favorites"
        component={ FavoritesStack }
        options={{
          drawerIcon: ({ tintColor }) => (<Icon name='heart' size={24} color={tintColor} type='font-awesome' onPress={() => navigation.toggleDrawer()}/>)
        }}
      /> 
      {/* <Drawer.Screen
        name="Other"
        component={ OtherStack }
      /> */}
    </Drawer.Navigator>
  )};



class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();


    NetInfo.fetch()
    .then((connectionInfo) => {
      const text = 'Initial Network Connectivity Type: '
      + connectionInfo.type + ', effectiveType: ' + JSON.stringify(connectionInfo)
        
      // Alert.alert('Connection', text
      //   )
    });

    this.netinfoUnsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);


  }

  componentWillUnmount() {
    if (this.netinfoUnsubscribe) {
      this.netinfoUnsubscribe();
      this.netinfoUnsubscribe;
    }
  }

  handleConnectivityChange = (connectionInfo) => {
    console.log(connectionInfo)
  }

  render() {
 
    return (
        // <SafeAreaView forceInset={{ top: 'always' }} style={{ backgroundColor: '#E3EFFF', flex: 1}}>
            <NavigationContainer>
                <MyDrawer />
            </NavigationContainer>
        // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);