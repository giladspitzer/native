import React, {Component} from 'react';
import { Card } from 'react-native-elements';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';


class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Animatable.View animation="fadeInDown" duration={1000} delay={1000}>   
                    <Card>
                        <Card.Title>Contact Information</Card.Title>
                        <Card.Divider/>
                        <Text style={{marginBottom: 10}}>
                            121, Clear Water Bay Road
                        </Text>
                        <Text style={{marginBottom: 10}}>
                            Clear Water Bay, Kowloon
                        </Text>
                        <Text style={{marginBottom: 10}}>
                            HONG KONG
                        </Text>
                        <Text style={{marginBottom: 10}}>
                            Tel: +852 1234 5678
                        </Text>
                        <Text style={{marginBottom: 10}}>
                            Fax: +852 8765 4321
                        </Text>
                        <Text style={{marginBottom: 10}}>
                            Email:confusion@food.net
                        </Text>
                    </Card>
                </Animatable.View>
            </View>
            
        )
    }


}

export default Contact