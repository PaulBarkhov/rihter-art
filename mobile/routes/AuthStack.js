import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../components/auth/Login'
import Registration from '../components/auth/Registration'
import RegistrationVerification from '../components/auth/RegistrationVerification'
import ResetPassword from '../components/auth/ResetPassword'
import ResetVerification from '../components/auth/ResetVerification'
import NewPassword from '../components/auth/NewPassword'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={() => {
                return {
                    headerShown: false
                }
            }}
        >
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='registration' component={Registration} />
            <Stack.Screen name='registrationVerification' component={RegistrationVerification} />

            <Stack.Screen name='resetPassword' component={ResetPassword} />
            <Stack.Screen name='resetVerification' component={ResetVerification} />
            <Stack.Screen name='newPassword' component={NewPassword} />
        </Stack.Navigator>
    )
}

export default AuthStack

