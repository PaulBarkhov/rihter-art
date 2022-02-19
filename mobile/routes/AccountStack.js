import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from "../components/Account";
import { Pressable } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator()

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
          headerRight: () => (
            <Pressable
              onPress={() => navigation.openDrawer()}
            >
              <MaterialIcons
                name="menu"
                size={28}
                onPress={() => navigation.openDrawer()}
              />
            </Pressable>
          )
        }
      }}
    >
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

export default AccountStack;


