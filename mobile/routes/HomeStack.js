import React from "react"
import { Pressable } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from "../components/HomePage"
import { MaterialIcons } from "@expo/vector-icons"
import Course from "../components/Course"
import LessonsList from "../components/LessonsList"
import Lesson from "../components/Lesson"
import Video from "../components/Video"

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.openDrawer()}
            >
              <MaterialIcons
                name="menu"
                color="white"
                size={28}
                onPress={() => navigation.openDrawer()}
              />
            </Pressable>
          )
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerTitle: 'Rihter Art Online',
        }}
      />
      <Stack.Screen
        name="Course"
        component={Course}
        options={{
          headerTitle: 'Rihter Art Online',
        }}
      />
      <Stack.Screen
        name="LessonsList"
        component={LessonsList}
        options={{
          headerTitle: 'Rihter Art Online',
        }}
      />
      <Stack.Screen
        name="Lesson"
        component={Lesson}
        options={{
          headerTitle: 'Rihter Art Online',
        }}
      />
      <Stack.Screen
        name="Video"
        component={Video}
        options={{
          headerTitle: 'Rihter Art Online',
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
