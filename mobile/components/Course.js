import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Course = ({ route, navigation, course }) => {

    const renderEnding = () => {
        switch (+String(course.number_of_lessons).slice(-1)) {
            case 1:
                return 'урок'

            case 2:
            case 3:
            case 4:
                return 'урока'

            default:
                return 'уроков'
        }
    }

    const ending = renderEnding()

    return (
        <TouchableOpacity
            key={course.id}
            onPress={() => {
                navigation.navigate({
                    name: "LessonsList",
                    params: { course: course }
                })
            }}>
            <View style={styles.item}>
                <Image source={require(`../assets/Photos/preview1.jpg`)} style={styles.image} />
                <View style={styles.textBlock}>
                    <Text style={styles.title}>{course.name}</Text>
                    <Text style={styles.price}>От {course.price} рублей</Text>
                    <Text style={styles.price}>
                        {String(course.number_of_available_lessons)} из {String(course.total_number_of_lessons).slice(-1)} {ending} доступны
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Course

const styles = StyleSheet.create({
    item: {
        margin: 10,
        flexDirection: 'row',
        backgroundColor: 'wheat',
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#b5b5b5',
        borderWidth: 1
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'sans-serif'
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'sans-serif'
    },
    image: {
        flex: 4,
        aspectRatio: 1 / 1,
        borderRadius: 10,
    },
    textBlock: {
        flex: 6,
        flexDirection: 'column',
        margin: 10,
        flexShrink: 1
    },
})