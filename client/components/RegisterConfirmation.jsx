//general
import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

//actions
import {setName} from '../redux/actions/user';

function RegisterConfirmation({name,setName}){
    return (
        <View style={styles.container}>

            <Text style={{ fontSize:40,flex:1 }}>Darse de alta</Text>
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={setName}>
                    <Link to="/" style={styles.button}>
                        <Text style={styles.buttonText}>Home</Text>
                    </Link>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

function mapStateToProps(state) {
    return {
        name: state.user.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setName: () => dispatch(setName())
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'green',
        paddingTop: StatusBar.currentHeight
      },
      button: {
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        alignSelf: 'stretch',
      },
      buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',

      },
      buttonsContainer: {
        flex:2,
        flexDirection: 'row',
      }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterConfirmation);