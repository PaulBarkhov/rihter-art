import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ text }) => {
    return (
        <TouchableOpacity>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5
    }
})