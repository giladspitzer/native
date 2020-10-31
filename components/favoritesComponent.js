import React, {Component} from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './loadingComponent';
import { deleteFavorite } from '../redux/ActionCreators'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Animatable from 'react-native-animatable';
// import {
//     SCLAlert,
//     SCLAlertButton
//   } from 'react-native-scl-alert'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component{
    render(){
        const  navigation  = this.props.navigation
        const renderMenuItem = ({ item, index }) => {
            const rightButton = () => {
                return(
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                        
                    }}>
                        <View style={{ backgroundColor: 'red', justifyContent: 'center', height:'100%' }}>
                            <Text
                                style={{
                                color: 'white',
                                paddingHorizontal: 10,
                                fontWeight: '600',
                                // transform: [{ scale }]
                                }}>
                                Delete
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            }

            return(
                <Animatable.View animation="fadeInRightBig" duration={1000}>
                <Swipeable renderRightActions={rightButton}>
                    <ListItem
                        key={index}
                        bottomDivider
                        onPress={() => navigation.navigate('DishDetail', {dishId: item.id})}
                    >
                        <Avatar source={{url: baseUrl + item.image}} rounded/>
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </Swipeable>
                </Animatable.View>
            )
        }
        if(this.props.dishes.isLoading){
            return(
                <Loading/>
            );
        }else if (this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }else{
            const favs = this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))
            if(favs.length > 0){
                return(
                    <FlatList 
                        data={favs}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                )
            }else{
                return(
                    <View>
                        <Text>You have nothing favorited yet</Text>
                    </View>
                )
            }
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);