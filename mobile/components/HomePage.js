import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Button
} from "react-native";
import Course from "./Course";


const HomePage = ({ navigation }) => {
  const [courses, setCourses] = React.useState([])
  const [refresher, setRefresher] = React.useState(false)
  const refresh = () => {
    setRefresher(!refresher)
  }

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        fetch('http://192.168.2.114:8000/get_all_courses')
          .then(res => res.json())
          .then(data => setCourses(data))
      } catch (e) {
        console.log('Error: ' + e)
      }
    }
    fetchCourses()
  }, [refresher])

  return (
    <ScrollView>
      <View>
        {courses.map(course => <Course course={course} navigation={navigation} />)}
        <Button title="Перезагрузить" onPress={() => refresh()} />
      </View>
    </ScrollView>
  )
}
export default HomePage;

const styles = StyleSheet.create({})


