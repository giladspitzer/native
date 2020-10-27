import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet, 
    SafeAreaView, Alert, PanResponder } from 'react-native';
import { Card, Icon, AirbnbRating, Input } from 'react-native-elements'
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { color } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites

    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (data) => dispatch(postComment(data))
})




function RenderDish(props){
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const rightDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -80 )
            return true;
        else
            return false;
    }
    const leftDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < 80 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (rightDrag(gestureState)){
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            }else if(leftDrag(gestureState)){
                props.toggleCommentModal()
            }
            return true;
        }
    })
    
    if(dish != null){
        return(
            <Animatable.View animation="fadeInDown" duration={1000} delay={1000}
            ref={this.handleViewRef}
            {...panResponder.panHandlers}>
            <Card>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Image source={{uri: baseUrl + dish.image}}/>     
            <Text style={{margin: 10}}>
                {dish.description}
            </Text>
            <View style={styles.icons}>
            <Icon 
                raised
                reverse
                name={props.favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={() => props.onPress()}
            />
            <Icon 
                raised
                reverse
                name='pencil'
                type='font-awesome'
                color='purple'
                onPress={() => props.toggleCommentModal()}
            />
            </View>
            </Card>
            </Animatable.View>
        );
    }else{
        return(<View></View>)
    }
}

function RenderComments(props){
    const comments = props.comments

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margine: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <AirbnbRating
                    defaultRating={item.rating}
                    count={5}
                    readonly
                    showRating={false}
                    size={14}
                />
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return(
        <Animatable.View animation="fadeInUp" duration={1000} delay={1000}>        
        <Card>
            <Card.Title>Comments</Card.Title>
            <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}/>
        </Card>
        </Animatable.View>
    )   
}

class DishDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            showCommentModal: false,
            rating: 5,
            author: '',
            comment: '',

        }
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    toggleCommentModal(){
        this.resetCommentForm()
        this.setState({ showCommentModal: !this.state.showCommentModal })
    }

    resetCommentForm(){
        this.setState({
            rating: 5,
            author: '',
            comment: '',
        })
    }

    handleCommentSubmit(){
        const params = this.state
        params.dishId = this.props.route.params['dishId']
        this.props.postComment(params)
        this.toggleCommentModal()
    }


    render(){
        const dishId = this.props.route.params['dishId']
        return(
        <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)} 
                toggleCommentModal={() => this.toggleCommentModal()}
                />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId).reverse()} />
            <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showCommentModal}
                    onDismiss = {() => this.toggleCommentModal() }
                    onRequestClose = {() => this.toggleCommentModal() }>
                    <SafeAreaView>
                    <AirbnbRating
                        count={5}
                        reviews={["Rating: 1/5", "Rating: 2/5", "Rating: 3/5", "Rating: 4/5", "Rating: 5/5"]}
                        defaultRating={this.state.rating}
                        size={50}
                        onFinishRating={num => this.setState({rating: num})}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={
                            <Icon name='user-o' size={24} type='font-awesome'/>
                        }
                        onChangeText={(text) => this.setState({author: text})}
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={
                            <Icon name='comment-o' size={24} type='font-awesome'/>
                        }
                        onChangeText={(text) => this.setState({comment: text})}
                        containerStyle={styles.large}
                    />
                    <Button
                        onPress={() => {this.handleCommentSubmit()}}
                        color="#512DA8"
                        title="Submit"      
                        accessibilityLabel="Learn more about this purple button" 
                    />    
                    <Button
                        onPress={() => {this.toggleCommentModal()}}
                        color="gray"
                        title="Close"      
                        accessibilityLabel="Learn more about this purple button" 
                    />                   
        
                    </SafeAreaView>
            </Modal>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    icons: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20,
    },
    large:{
        height: 500
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);