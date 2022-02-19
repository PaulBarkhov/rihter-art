import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image } from "react-native"
import { BlurView } from 'expo-blur'
import GlobalStyles from "./GlobalStyles"

const Course = ({ route, navigation }) => {
  const [lessons, setLessons] = useState()
  const [refresher, setRefresher] = useState(false)

  useEffect(() => {
    fetch(`http://192.168.2.114:8000/get_lessons/${route.params.course.id}`)
      .then(res => res.json())
      .then(data => setLessons(data))
  }, [refresher])
  const refresh = () => setRefresher(!refresher)


  if (!lessons) return (<View><Text>Loading</Text></View>)
  else return (
    <ScrollView >
      <View style={styles.course}>
        <Text style={styles.courseHeader}>Курс</Text>
        <Text>{route.params.course.name}</Text>
        <Text>{route.params.course.description}</Text>
        {lessons.free_lessons.map(lesson => {
          return (
            <TouchableOpacity key={lesson.id} style={styles.touchable} onPress={() => navigation.navigate("Lesson", { lesson: lesson })}>
              <View style={styles.item}>
                <Text style={styles.title}>{lesson.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })}

        {lessons.purchased_lessons.map(lesson => {
          return (
            <TouchableOpacity key={lesson.id} style={styles.touchable} onPress={() => navigation.navigate("Lesson", { lesson: lesson })}>
              <View style={styles.item}>
                <Text style={styles.title}>{lesson.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })}





        {lessons.unavailable_lessonPacks.map(lessonPack => {
          return (
            <View key={lessonPack.id} style={{ width: '100%', position: 'relative' }}>
              {lessonPack.videos.map(lesson => {
                return (
                  <TouchableOpacity key={lesson.id} style={styles.touchable} onPress={() => navigation.navigate("Lesson", { lesson: lesson })}>
                    <View style={[styles.item]}>
                      {/* <View style={[styles.item, { backgroundColor: '#cfcfcf' }]}> */}
                      <Text style={styles.title}>{lesson.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
              <BlurView intensity={80} tint="light"
                style={{
                  position: "absolute",
                  left: 0,
                  top: -5,
                  right: 0,
                  bottom: 5,
                  borderColor: '#cfcfcf',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, borderColor: 'grey', borderWidth: 1 }}
                  onPress={() => {
                    fetch('http://192.168.2.114:8000/buy_lessonPack',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'applications/json'
                        },
                        body: JSON.stringify({ lessonPack: lessonPack.id })
                      }
                    )
                      .then(refresh)
                  }}
                >
                  <Text style={{ color: 'grey', fontSize: 18, fontWeight: '800' }}>
                    Купить за {lessonPack.price} рублей
                  </Text>
                </TouchableOpacity>

              </BlurView>
            </View>

          )
        })}




      </View>
    </ScrollView>
  )
}

export default Course

const styles = StyleSheet.create({
  course: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  courseHeader: {
    fontSize: 30,
    margin: 10
  },
  touchable: {
    width: '100%',
    padding: 5
  },
  item: {
    marginBottom: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 6
  },
  title: {
    fontSize: 20,
    padding: 10,
    color: 'white',
    fontWeight: '600'
  },

})
