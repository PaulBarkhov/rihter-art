import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

const Admin = () => {
    return (
        <WebView source={{
            uri: 'http://www.rihter-art.ru/admin'
        }} />
    )
}

export default Admin

const styles = StyleSheet.create({})
