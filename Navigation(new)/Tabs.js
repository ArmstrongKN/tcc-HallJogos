import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../Paginas/HomeScreen'
import Agenda from '../Paginas/Agenda'
import Diario from '../Paginas/Diario'
import Stats from '../Paginas/Stats'
import Map from '../Paginas/Mapa'


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) =>(
    <TouchableOpacity
    style={{
        top: -20,
        alignItems: 'center',
        justifyContent: 'center',
        ...styles.shadow
    }}
    onPress={onPress}>
        <View
        style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#FE7200'
        }}
        >
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () =>{
    return(
<Tab.Navigator
screenOptions={{
    headerShown: false, //tirar a barra com o nome da tab bar
    tabBarStyle:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 0,
        borderRadius: 12,
        backgroundColor: '#6CB1F1',
        height: 70,
        ...styles.shadow

    }
}}
    tabBarOptions={{
        showLabel: false,
    }}
>
    <Tab.Screen name={"Mind-Pass"} component={Home} options={{
        tabBarIcon: ({focused})=>(
            <View style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
                <Image source={require('../assets/minicerebro.png')} 
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#ffff' : '#000' 
                }}
                />
                <Text style={{color: focused ? '#ffff' : '#000', fontSize: 12 }}>
                    Mind-Pass
                </Text>
            </View>
        ),
    }}>

    </Tab.Screen>
    <Tab.Screen name="Stats" component={Stats} options={{
        tabBarIcon: ({focused})=>(
            <View style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
                <Image source={require('../assets/icone-stats.png')} 
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#ffff' : '#000' 
                }}
                />
                <Text style={{color: focused ? '#ffff' : '#000', fontSize: 12 }}>
                    Stats
                </Text>
            </View>
        ),
    }}>

    </Tab.Screen>

    <Tab.Screen name="Diario" component={Diario} options={{
        tabBarIcon: ({focused}) =>(
            <Image 
                source={require('../assets/diario.png')}
                resizeMode='contain'
                style={{
                    width: 30,
                    height: 30,
                    tintColor: '#ffff'
                }}
            />
        ),
        tabBarButton: (props)=>(
            <CustomTabBarButton {...props} />
        )
    }}>

    </Tab.Screen>

    <Tab.Screen name="Mapa" component={Map} options={{
        tabBarIcon: ({focused})=>(
            <View style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
                <Image source={require('../assets/mapa.png')} 
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#ffff' : '#000' 
                }}
                />
                <Text style={{color: focused ? '#ffff' : '#000', fontSize: 12 }}>
                    Mapa
                </Text>
            </View>
        ),
    }}>

    </Tab.Screen>

    <Tab.Screen name="Agenda" component={Agenda} options={{
        tabBarIcon: ({focused})=>(
            <View style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
                <Image source={require('../assets/agenda.png')} 
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#ffff' : '#000' 
                }}
                />
                <Text style={{color: focused ? '#ffff' : '#000', fontSize: 12 }}>
                    Agenda
                </Text>
            </View>
        ),
    }}>

    </Tab.Screen>
</Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 10
    }
});

export default Tabs;