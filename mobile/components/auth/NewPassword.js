import { Dimensions, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import GlobalStyles from '../GlobalStyles'

const ResetPassword = ({ navigation, route }) => {
    const [inputValue, setInputValue] = React.useState({
        password1: '',
        password2: ''
    })
    const [errorMessage, setErrorMessage] = React.useState()

    const handlePress = async () => {
        if (!inputValue) {
            setErrorMessage('Введите Email')
            return
        }
        if (inputValue.password1 !== inputValue.password2) {
            setErrorMessage('Пароли не совпадают')
            return
        }
        await fetch(`http://192.168.2.114:8000/new_password`, {
            method: 'POST',
            header: {
                "Content-Type": "applications/json",
            },
            body: JSON.stringify({ password: inputValue.password1 }),
        })
            .then(res => {
                if (res.status === 200) navigation.navigate("login")
                else setErrorMessage(res)
            })

    }

    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.form}>
                <Text style={GlobalStyles.header}>Задайте новый пароль</Text>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
                <KeyboardAvoidingView style={{ width: '100%' }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TextInput
                        style={GlobalStyles.input}
                        placeholder={`Пароль`}
                        onChangeText={text => setInputValue({ ...inputValue, password1: text })}
                    />
                    <TextInput
                        style={GlobalStyles.input}
                        placeholder={`Повторите пароль`}
                        onChangeText={text => setInputValue({ ...inputValue, password2: text })}
                    />
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={handlePress} style={GlobalStyles.button}><Text style={GlobalStyles.buttonText}>Готово</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default ResetPassword;

const styles = StyleSheet.create({});
