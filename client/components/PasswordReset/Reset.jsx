import React, { useState } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, Button, StyleSheet, StatusBar, Alert, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Link, useHistory } from 'react-router-native'
import colors from "../style/colors";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { Poppins_900Black } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import env from '../../env';

//Redux
import { connect } from "react-redux";
import { PasswordReset } from "../../redux/actions/PasswordReset";

import s from '../style/styleSheet';

function Index({ email, passwordReset }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: StatusBar.currentHeight,
        },
        header: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            height: StatusBar.currentHeight * 2,
            backgroundColor: colors.orange,
        },
        headerText: {
            fontSize: 30,
        },
        content: {
            flex: 5,
            paddingTop: 60,
            backgroundColor: "rgb(34,31,59)",
            width: '100%'
        },
        titleWrapper: {
            // flex: 0.7,
            justifyContent: "center",
            alignItems: 'center',
            alignSelf: 'center',
            paddingTop: 10,
            width: '90%',
        },
        title: {
            alignSelf: "center",
            color: colors.white,
            fontSize: 35,
            fontFamily: "Poppins_600SemiBold",
            textAlign: 'center',
        },
        subTitle: {
            color: 'white',
            alignSelf: 'center',
            fontSize: 20,
            paddingTop: 10,
            textAlign: 'center',

        },
        inputWrapper: {
            // flex: 1.7,
            alignItems: "center",
            marginTop: 40,
            marginBottom: 10,
        },
        inputs: {
            // flex: 0.5,
            justifyContent: "space-around",
        },
        input: {
            fontFamily: "Poppins_400Regular_Italic",
            color: "#221F3B",
            backgroundColor: colors.white,
            margin: 5,
            height: 50,
            width: 250,
            borderBottomColor: colors.pink,
            borderBottomWidth: 5,
            borderRadius: 5,
            fontSize: 20,
            paddingLeft: 8,
            paddingBottom: 5,
        },
        button: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.pink,
            alignSelf: "center",
            width: 250,
            height: 60,
            borderRadius: 5,
        },
        buttonText: {
            textAlign: "center",
            padding: 20,
            color: colors.white,
            fontSize: 20,
            fontFamily: "Poppins_600SemiBold",
        },
        backButton: {
            backgroundColor: colors.pink,
            height: 40,
            width: 80,
            borderRadius: 7,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
        },
        backButtonText: {
            color: colors.white,
            fontSize: 15,
            fontFamily: "Poppins_400Regular",
        },
        error: {
            color: colors.white,
            fontSize: 30,

        }
    });

    /* Dis se utiliza para desabilitar el boton y el input y tambien habilitar el spinner */
    const [dis, setDis] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [password, setPassword] = useState();
    const [c_password, setC_Password] = useState();
    const [error, setError] = useState({ error: false, message: '' })
    const history = useHistory();
    const { control, handleSubmit, errors } = useForm();
    //console.log('reset email', email);
    const onSubmit = data => {
        setDis(true)
        data.email = email
        data.code = parseInt(data.code)
        setError({ error: false })
        if (password !== c_password) {
            setError({ error: true, message: 'Las contraseñas no coinciden' })
            setDis(false)
        } else {
            /* Se solicita a la api que envie un mail con un codigo */
            axios.put(env.API_URI + 'auth/restore_password', JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    setDis(false)
                    history.push("/login");
                })
                .catch((err) => {
                    setDis(false)
                    setError({ error: true, message: 'Error en la comprobacion. Revise el codigo enviado' })
                });
        }
    };

    return (
        <View style={s.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
            />
            <ScrollView>
                <View style={{ ...s.mb(5) }}>
                    <Link to="/login" component={TouchableOpacity}>
                        <Text style={s.textColor('orange')}> &lt; Volver</Text>
                    </Link>
                </View>
                <View>
                    <Image source={require("../../logo.png")} style={{ width: 160, height: 160, alignSelf: "center" }}></Image>
                </View>

                <View>
                    <Text style={{ ...s.textColor("#fff"), ...s.size(5), textAlign: 'center' }}>Ingrese el codigo enviado a su correo electrónico</Text>
                </View>


                <View>
                    <ActivityIndicator animating={dis} size="large" color={colors.pink} />
                    {error.error && <View><Text style={{ ...s.textColor("#fff"), ...s.size(5), textAlign: 'center' }}>{error.message}</Text></View>}
                    <Text style={{ ...s.textWhite, ...s.size(4) }}>Código</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ ...s.input, ...s.mb(3) }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder="Código"
                                // autoFocus={true}
                                editable={!dis}
                            />
                        )}
                        name="code"
                        rules={{ required: true }}
                        defaultValue=""
                    />

                    <Text style={{ ...s.textWhite, ...s.size(4) }}>Nueva Contraseña</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                secureTextEntry={hidePassword}
                                style={{ ...s.input, ...s.mb(3) }}
                                onBlur={onBlur}
                                onChangeText={value => {
                                    onChange(value);
                                    setPassword(value);
                                }}
                                value={value}
                                placeholder="Contraseña"
                                editable={!dis}
                            />
                        )}
                        name="newPassword"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    
                    <Text style={{ ...s.textWhite, ...s.size(4) }}>Repetir Nueva Contraseña</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                secureTextEntry={hidePassword}
                                style={{ ...s.input, ...s.mb(4) }}
                                onBlur={onBlur}
                                onChangeText={value => {
                                    onChange(value)
                                    setC_Password(value);
                                }}
                                value={value}
                                placeholder="Confirmar Contraseña"
                                editable={!dis}
                            />
                        )}
                        name="confirmaPassword"
                        rules={{ required: true }}
                        defaultValue=""
                    />     
                </View>
                <TouchableOpacity
                    style={s.btn()}
                    onPress={handleSubmit(onSubmit)}
                    disabled={dis}
                >
                    <Text style={s.textButton()}>Modificar Contraseña</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.PasswordReset.email,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        PasswordReset: (data) => dispatch(PasswordReset(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);