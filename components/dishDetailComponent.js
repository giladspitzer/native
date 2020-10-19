import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements'
import { DISHES } from '../shared/dishes'


function RenderDish(props){
    console.warn(dish)
    const dish = props.dish
    if(dish != null){
        return(
            <Card>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Image source={require('../assets/images/uthappizza.png')}/>     
            <Text style={{margin: 10}}>
                {dish.description}
            </Text>
            </Card>
        );
    }else{
        return(<View></View>)
    }
}

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: 'Dish Details',
    };


    render(){
        const dishId = this.props.route.params['dishId']
        return(<RenderDish dish={this.state.dishes[dishId]}/>)
    }
}

export default DishDetail;