import React, {Component} from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';



class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        headerStyle:{
            title: 'Menu',
        }
    };

    render(){
        const navigation = this.props.navigation;
        const renderMenuItem = ({item, index}) => {
            return (
                    <ListItem key={index} bottomDivider onPress={() => navigation.navigate('DishDetail', { dishId: item.id })}>
                    <Avatar source={require('../assets/images/uthappizza.png')}/>
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.name}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {item.description}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    
            ); 
        };
        return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }
}


export default Menu;