import { Dimensions, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react';
import GlobalStyles from '../GlobalStyles'

const RegistrationVerification = ({ navigation, route }) => {
    const [inputValue, setInputValue] = React.useState()
    const [errorMessage, setErrorMessage] = React.useState()

    const handlePress = async () => {
        if (!inputValue) {
            setErrorMessage('Введите Email')
            return
        }
        await fetch(`http://192.168.2.114:8000/verify_code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify({ code: inputValue })
        })
            .then(res => {
                if (res.status === 200) {
                    try {
                        fetch("http://192.168.2.114:8000/registration", {
                            method: "POST",
                            headers: {
                                "Content-Type": "applications/json",
                            },
                            body: JSON.stringify(route.params.userData),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.isRegistered) {
                                    console.log('success')
                                    navigation.navigate('login')
                                } else {
                                    console.log('Failure')
                                }
                            });
                    } catch (error) {
                        console.log("Ошибка", error);
                    }
                }
                else setErrorMessage('Ошибка')
            })
    }

    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.form}>
                <Text style={GlobalStyles.header}>Введите код</Text>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
                <KeyboardAvoidingView style={{ width: '100%' }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TextInput
                        style={GlobalStyles.input}
                        placeholder={`Код из письма ${route.params.userData.email}`}
                        onChangeText={text => setInputValue(text)}
                        keyboardType="number-pad"
                    />
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={handlePress} style={GlobalStyles.button}><Text style={GlobalStyles.buttonText}>Проверить</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default RegistrationVerification;

const styles = StyleSheet.create({});
