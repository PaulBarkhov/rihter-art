import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from '../components/Admin'
import { Pressable } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator()

const AdminStack = () => {
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
      <Stack.Screen
        name="Admin"
        component={Admin}
      />
    </Stack.Navigator>
  );
}

export default AdminStack;


