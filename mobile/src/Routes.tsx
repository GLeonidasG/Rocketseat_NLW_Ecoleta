import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../src/pages/Home'
import Detail from '../src/pages/Detail'
import Points from '../src/pages/Points'
const Router = () =>{

    const Stack = createStackNavigator()

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Home" headerMode='none'>
                <Stack.Screen name="Home"   component={Home}   />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Points" component={Points} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router