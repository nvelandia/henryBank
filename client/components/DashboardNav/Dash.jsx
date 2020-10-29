//general
import React,{useEffect, useState} from 'react';
import { View, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {Dimensions } from "react-native";
// import { Rect } from 'react-native-svg';

import axios from 'axios';
import { updateUserInfo, updateBalances } from '../../redux/actions/auth';
import env from '../../env';
//components
import Deposit from './Deposit/Deposit';
import SendMoney from './SendMoney';
import { useHeaderHeight } from '@react-navigation/stack';

// UI
import { NavigationContainer } from '@react-navigation/native';
import { bn, Container, hbn, Label, QTLink, toastConfig } from '../Quantum';
import Toast from 'react-native-toast-message';
import { TabBar, TabView, Tab, Modal, Input, Card, Icon, Layout, Text as KText, Button } from '@ui-kitten/components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SvgXml } from "react-native-svg";

const { Navigator, Screen } = createMaterialTopTabNavigator();

function SvgComponent(props){  
    const svgMarkup = `<svg id="fa31da1d-917f-4e54-b738-e4bf96d4c31c" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="427.96506" height="546.26859" viewBox="0 0 427.96506 546.26859"><polygon points="257.738 535.649 0 535.649 0 533.543 258.12 533.543 257.738 535.649" fill="#3f3d56"/><polygon points="89.053 505.128 74.053 506.128 76.053 349.128 113.053 349.128 89.053 505.128" fill="#a0616a"/><polygon points="161.053 505.128 146.053 506.128 148.053 349.128 171.983 349.134 161.053 505.128" fill="#a0616a"/><path d="M563.07022,664.99341c-15.70166,7.16095-30.46015,6.79583-44.50812.76083l-7.49188-179.76083L489.6116,664.18072c-15.69074,3.882-31.55036,3.865-47.54138.81269,3.6831-26.69269,19.40612-189.19538,18-219l105-5Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41"/><path d="M472.38764,723.13429h0a15.1713,15.1713,0,0,1-15.1448-16.06765l1.44716-24.4515c5.82716-10.44764,12.9-10.48986,21.14323-.75512l6.97824,21.39945A15.17131,15.17131,0,0,1,472.38764,723.13429Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41"/><path d="M543.38764,723.13429h0a15.1713,15.1713,0,0,1-15.1448-16.06765l1.44716-24.4515c5.82716-10.44764,12.9-10.48986,21.14323-.75512l6.97824,21.39945A15.17131,15.17131,0,0,1,543.38764,723.13429Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41"/><circle cx="137.05274" cy="41.1277" r="29" fill="#a0616a"/><path d="M522.07022,272.99341l-47-19c11.248-5.51334,18.885-15.75937,25-28h21C520.06851,244.67119,519.26181,262.90918,522.07022,272.99341Z" transform="translate(-386.01747 -176.86571)" fill="#a0616a"/><path d="M568.07022,447.99341l-112,3c1.364-53.77922-1.02882-109.1162-6.64346-165.7891a29.127,29.127,0,0,1,18.76745-30.1324l10.876-4.0785,44,12,20.766,15.9206a21.257,21.257,0,0,1,8.24412,18.348C548.93654,343.17338,555.956,394.281,568.07022,447.99341Z" transform="translate(-386.01747 -176.86571)" fill="#e94560"/><path d="M580.55763,485.8702h0a11.66222,11.66222,0,0,1-12.26574-10.35548l-2.4756-22.29213,13.23085-3.68608,10.92467,18.84112A11.66222,11.66222,0,0,1,580.55763,485.8702Z" transform="translate(-386.01747 -176.86571)" fill="#a0616a"/><path d="M592.07022,454.99341l-26,1-20-80-5-99h0a20.76177,20.76177,0,0,1,18.02261,17.99714l8.97738,71.00286Z" transform="translate(-386.01747 -176.86571)" fill="#e94560"/><polygon points="82.553 129.628 81.553 195.628 125.553 269.628 86.553 193.628 82.553 129.628" opacity="0.2"/><polygon points="69.277 229.313 95.356 274.128 86.114 273.628 69.277 229.313" opacity="0.2"/><path d="M515.70091,397.45777a4.59435,4.59435,0,0,0-4.589,4.589V686.56285a4.59435,4.59435,0,0,0,4.589,4.58895H809.39358a4.59435,4.59435,0,0,0,4.58895-4.58895V402.04672a4.59435,4.59435,0,0,0-4.58895-4.589Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M522.61173,679.652H802.48234V408.95768H522.61173Z" transform="translate(-386.01747 -176.86571)" fill="#fff"/><path d="M547.53888,452.08294c-1.86725,0-3.38649,2.67629-3.38649,5.96563s1.51924,5.96564,3.38649,5.96564H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96564s-1.51925-5.96563-3.3865-5.96563Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M547.53888,488.79452c-1.86725,0-3.38649,2.67629-3.38649,5.96564s1.51924,5.96563,3.38649,5.96563H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96563s-1.51925-5.96564-3.3865-5.96564Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M547.53888,525.08294c-1.86725,0-3.38649,2.67629-3.38649,5.96563s1.51924,5.96564,3.38649,5.96564H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96564s-1.51925-5.96563-3.3865-5.96563Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M547.53888,561.79452c-1.86725,0-3.38649,2.67629-3.38649,5.96564s1.51924,5.96563,3.38649,5.96563H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96563s-1.51925-5.96564-3.3865-5.96564Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M739.8522,452.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M739.8522,488.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M739.8522,524.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M739.8522,560.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6"/><path d="M732.5805,620.8397a7.60148,7.60148,0,0,0,0,15.203h30.40593a7.60148,7.60148,0,0,0,0-15.203Z" transform="translate(-386.01747 -176.86571)" fill="#e94560"/><rect x="158.55274" y="423.6277" width="225" height="2" fill="#e6e6e6"/><path d="M518.41561,480.94406l0,0a11.66224,11.66224,0,0,1-15.30254-4.84941l-10.84868-19.63095,10.79986-8.4856,17.32392,13.19918A11.66221,11.66221,0,0,1,518.41561,480.94406Z" transform="translate(-386.01747 -176.86571)" fill="#a0616a"/><path d="M511.07022,448.99341l-22,12-50-86-5.762-75.62608a39.49893,39.49893,0,0,1,25.27824-39.8948l6.48375-2.47908,4,114Z" transform="translate(-386.01747 -176.86571)" fill="#e94560"/><path d="M547.67761,186.16433,548,191l-2.48987-6.63965a38.65038,38.65038,0,0,0-21.484-7.36694l-.00006-.00006A28.48408,28.48408,0,0,0,493.724,212.839l.34619,4.15442,8-11h.00006a28.12412,28.12412,0,0,1,27.075-6.07258,47.71738,47.71738,0,0,1,10.01789,4.36524,55.04778,55.04778,0,0,1,12.9071,10.70734l.69495-4.72559C557.436,201.48177,554.65552,192.56258,547.67761,186.16433Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41"/></svg>`;
    const SvgImage = () => <SvgXml xml={svgMarkup} width="150px" height="150px" {...props} />;  

    return <SvgImage />;
}

function Dash({user, navigation}){
    const [ dis, setDis ] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const urlAvatar = (name,surname) => {
        return 'https://ui-avatars.com/api/?name='+name+'+'+surname+'&background=FFBD69&color=000'
    }


    const initialState = {
        user:{
            id: null,
            name:null,
            surname: null,
            avatar: null,
            balance:0
        },
        load: 0,
        loading: true
    }
    const [state,setState] = useState(initialState);

    useEffect(() => {
        if(!user) return;
        // console.log(user)
        let data = user;
        data.avatar = user.avatar ? user.avatar : urlAvatar(user.name, user.surname);
        setState(state => {
            return {
                ...state,
                user:{
                    ...data,
                    balance:user.balance,
                },
                load: state.load +1
            }
        });
    },[user, user.balance]);

    useEffect(()=>{
        setState(state => {
            return {
                ...state,
                loading: state.load < 1 ? true : false
            }
        })
    },[state.load])

    // const [fontsLoaded] = useFonts({
    //     Poppins_600SemiBold
    // })

    //if(!fontsLoaded) return <AppLoading />
    return (
        <>
            <Layout>
                <SvgComponent height="200px" width="200px" style={bn('ml-auto mr-auto my-5')} />
            </Layout>
            <TabNavigator dis={dis} setDis={setDis} />
            <Layout style={{flex:1}}>
                <Button status="info"
                    style={bn('mt-10 mr-auto ml-auto borderRadius-40 h-80 w-80')}
                    size="large"
                    appearance="outline"
                    onPress={() => setShowModal(true)}
                >
                    MÁS
                </Button>
            </Layout>


            <Modal visible={showModal}
                backdropStyle={bn('bg-rgba(0,0,0,.5)')}
                style={bn('container px-1')}>
                <Card tyle={{...bn('row')}}>
                    <KText category="h6" style={bn('text-center mb-4')}>MÁS OPCIONES</KText>


                    <View style={bn('row')}>
                        <View style={bn('col-6 p-1 h-80')}>
                            <Button
                                appearance="outline"
                                status="info"
                                style={bn('h-70 my-1')}
                                size="small"
                                onPress={()=>{setShowModal(false); navigation.navigate('Contactos')}}
                            >
                                Contactos
                            </Button>
                        </View>
                        <View style={bn('col-6 p-1 h-80')}>
                            <Button
                                appearance="outline"
                                status="info"
                                style={bn('h-70 my-1')}
                                size="small"
                                onPress={()=>{setShowModal(false); navigation.navigate('Estadísticas')}}
                            >
                                Estadísticas
                            </Button>
                        </View>
                        <View style={bn('col-6 p-1 h-80')}>
                            <Button
                                appearance="outline"
                                status="info"
                                style={bn('h-70 my-1')}
                                size="small"
                                onPress={()=>{setShowModal(false); navigation.navigate('Recarga')}}
                            >
                                Recarga
                            </Button>
                        </View>
                        <View style={bn('col-6 p-1 h-80')}>
                            <Button
                                appearance="outline"
                                status="info"
                                style={bn('h-70 my-1')}
                                size="small"
                                onPress={()=>{setShowModal(false); navigation.navigate('Cuentas')}}
                            >
                                Cuentas
                            </Button>
                        </View>
                    </View>

                    <View style={bn('col-12 mt-4')}>
                        <Button appearance="ghost" status="basic" onPress={() => setShowModal(false)}>
                            CERRAR
                        </Button>
                    </View>
                </Card>
            </Modal>

            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)}/>
        </>
    );
}

const TabNavigator = ({navigation}) => (
    <Navigator tabBar={props => <TopTabBar {...props} indicatorStyle={bn('text-red')} />}>
        <Screen name='Pesos' component={PesosScreenConn}/>
        <Screen name='Dollars' component={UsdScreenConn}/>
    </Navigator>
);

const PesosScreen = ({accounts, navigation}) => {

    const [state,setState] = useState({
        balance: 0
    })



    useEffect(()=>{
        // console.log(accounts)
        if(!accounts) return;
        setState(state => {
            return {
                ...state,
                balance: accounts[1].balance
            }
        })
    },[accounts])

    return (<Layout style={{flex:1,...bn('py-6 px-6')}}>
        <KText category='h2' style={bn('mb-4 text-center')}>ARS {state.balance.toFixed(2)}</KText>
        <View style={bn('row')}>
            <View style={bn('col-6 pr-2')}>
                <Button size="small" onPress={() => navigation.navigate('Transferencia')}>
                    TRANSFERIR
                </Button>
            </View>
            <View style={bn('col-6 pl-2')}>
                <Button size="small" appearance="outline" onPress={() => navigation.navigate('Transferencias')}>
                    MOVIMIENTOS
                </Button>
            </View>
        </View>
    </Layout>);
};
  
const UsdScreen = ({token, accounts, navigation, updateUserInfo, updateBalances}) => {
    const [state,setState] = useState({
        balance: 0,
        usdAmount: 0,
        usdToArs: 0
    })

    const [ dis, setDis ] = useState(false);

    const [visible,setVisible] = useState(false);
    const [visibleSell, setVisibleSell] = useState(false);

    const handleSell = () => {
        const amount = parseInt(state.usdAmount);
        setDis(true);
        axios.post(`${env.API_URI}/dollars/sell`, JSON.stringify({amount}), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.data)
        .then((res)=>{
            console.log('RESPUESTA VENTA DOLARES',res)
            updateBalances(res);
            setDis(false);
            setVisibleSell(false);
            Toast.show({
                type: "success",
                text1: "¡Venta de dólares realizada!",
                text2: `Te acreditamos ARS ${state.usdToArs}`
            })
            setState({
                ...state,
                usdAmount: 0,
                usdToArs: 0
            })
        })
        .catch(err=>console.log(err))
    }

    const handleBuy = () => {
        const amount = parseInt(state.usdAmount)
        // if(amount == 0 || amount > 200){
        //     return;
        // }
        axios.post(`${env.API_URI}/dollars/buy`, JSON.stringify({amount}), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.data)
        .then((res)=>{
            console.log(res);
            updateUserInfo(res);
            setVisible(false);
            Toast.show({
                type: "success",
                text1: "¡Compra de dólares realizada!",
                text2: `Has comprado USD ${state.usdAmount}.`
            })
            setState({
                ...state,
                usdAmount: 0,
                usdToArs: 0
            })
        })
        .catch(err=>{
            console.log(err.response.data)
            if(err.response.data.code == 403){
                setVisible(false);
                Toast.show({
                    type: "error",
                    text1: "Saldo insuficiente."
                })
            }
        })
    }

    useEffect(()=>{
        if(!accounts) return;
        setState(state => {
            return {
                ...state,
                balance: accounts[0].balance
            }
        })
    },[accounts])
    return (<Layout style={{flex:1,...bn('py-6 px-6')}}>
        <KText category='h2' style={bn('mb-4 text-center')}>USD {state.balance.toFixed(2)}</KText>
        <View style={bn('row')}>
            <View style={bn('col-6 pr-2')}>
                <Button size="small" onPress={() => setVisible(true)}>
                    COMPRAR
                </Button>
            </View>
            <View style={bn('col-6 pl-2')}>
                <Button size="small" appearance="outline" onPress={() => setVisibleSell(true)}>
                    VENDER
                </Button>
            </View>
        </View>
        {/* MODAL COMPRA DOLARES */}
        <Modal visible={visible}
            backdropStyle={bn('bg-rgba(0,0,0,.5)')}
            style={bn('container px-6')}>
            <Card tyle={{...bn('row')}}>
                <KText category="h2" style={bn('mb-4')}>Comprar USD</KText>
                <View style={bn('col-12 mb-4')}>

                    <Input
                        label="Ingrese un monto"
                        placeholder='0.00'
                        onChangeText={value => setState({
                            ...state,
                            usdAmount: value
                        })}
                        keyboardType="number-pad"
                    />
                    <Label style={{textAlign: "center"}} text={`Se le cobrarán ARS ${state.usdToArs.toFixed(2)}`}/>
                </View>
                <View style={bn('col-12')}>
                    <Button style="w-100%" onPress={handleBuy}>
                        COMPRAR
                    </Button>
                </View>
                <View style={bn('col-12')}>
                    <Button appearance="ghost" onPress={() => setVisible(false)}>
                        CANCELAR
                    </Button>
                </View>
            </Card>
        </Modal>
        {/* MODAL VENTA DOLARES */}
        <Modal visible={visibleSell}
            backdropStyle={bn('bg-rgba(0,0,0,.5)')}
            style={bn('container px-6')}>
            <Card tyle={{...bn('row')}}>
                <KText category="h2" style={bn('mb-4')}>Vender USD</KText>
                <View style={bn('col-12 mb-4')}>

                    <Input
                        label="Ingrese un monto"
                        placeholder='0.00'
                        onChangeText={value => setState({
                            ...state,
                            usdAmount: value
                        })}
                        keyboardType="number-pad"
                    />
                    <Label style={{textAlign: "center"}} text={`Se le acreditarán ARS ${state.usdToArs.toFixed(2)}`}/>
                </View>
                <View style={bn('col-12')}>
                    <Button style="w-100%" onPress={handleSell}>
                        VENDER
                    </Button>
                </View>
                <View style={bn('col-12')}>
                    <Button appearance="ghost" onPress={() => setVisibleSell(false)}>
                        CANCELAR
                    </Button>
                </View>
            </Card>
        </Modal>

    </Layout>);
};

const TopTabBar = ({ navigation, state }) => (
    <Layout style={bn('px-6')}>
        <TabView
            indicatorStyle={bn('bg-primary')}
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <Tab style={bn('px-4')} title="ARS"/>
            <Tab style={bn('px-4')} title='USD'/>
        </TabView>
    </Layout>
  );

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        token: state.auth.token,
        accounts: state.auth.user.accounts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserInfo: data => dispatch(updateUserInfo(data)),
        updateBalances: data => dispatch(updateBalances(data))
    }
}

const PesosScreenConn = connect(
    mapStateToProps,
    mapDispatchToProps
)(PesosScreen);

const UsdScreenConn = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsdScreen);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dash);
