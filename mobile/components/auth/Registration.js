import React, { useState } from "react"
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
} from "react-native"
import GlobalStyles from '../GlobalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectDropdown from 'react-native-select-dropdown'
import CheckBox from 'react-native-check-box'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AuthContext from "../../context/AuthContext"
import { TextInputMask } from 'react-native-masked-text'

const Registration = ({ navigation }) => {

    const [userData, setUserData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        // birthDate: '',
        // language: 'Русский',
        password: ''
    })

    const [repeatPassword, setRepeatPassword] = React.useState('')
    const [isChecked, setIsChecked] = React.useState(false)

    const [errors, setErrors] = React.useState({
        server: '',
        firstName: '',
        lastName: '',
        email: '',
        // birthDate: '',
        // language: '',
        password: '',
        repeatPassword: '',
        check: ''
    })

    const register = async () => {
        let is_empty = false
        const errorsCopy = JSON.parse(JSON.stringify(errors))

        if (!isChecked) {
            errorsCopy.check = 'Подтвердите согласие'
            is_empty = true
        }
        if (!repeatPassword) {
            errorsCopy.repeatPassword = 'Повторите пароль'
            is_empty = true
        }
        if (!userData.password) {
            errorsCopy.password = 'Укажите пароль'
            is_empty = true
        }
        // if (!userData.language) {
        //     errorsCopy.language = 'Выберите Язык'
        //     is_empty = true
        // }
        // if (!userData.birthDate) {
        //     errorsCopy.birthDate = 'Укажите дату'
        //     is_empty = true
        // }
        if (!userData.email) {
            errorsCopy.email = 'Введите Email'
            is_empty = true
        }
        if (!userData.lastName) {
            errorsCopy.lastName = 'Введите фамилию'
            is_empty = true
        }
        if (!userData.firstName) {
            errorsCopy.firstName = 'Введите имя'
            is_empty = true
        }

        if (is_empty) {
            setErrors(errorsCopy)
            return
        }

        if (!is_empty && !errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.repeatPassword && !errors.check) {
            await fetch(`http://192.168.2.114:8000/verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'applications/json'
                },
                body: JSON.stringify({ email: userData.email })
            })
                .then(res => {
                    if (res.status === 409) setErrors({ ...errors, email: 'Email занят' })
                    if (res.status === 200) navigation.navigate('registrationVerification', { userData: userData })
                })
        }
    }

    const validate = (inputName, inputValue) => {
        // const format = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        const format = /^[a-zа-я ,.'-]+$/i

        switch (inputName) {
            case 'firstName':

                // setUserData({ ...userData, firstName: inputValue.replace(format, '') })
                if (format.test(inputValue) || inputValue == '') {
                    setErrors({ ...errors, firstName: '' })
                    setUserData({ ...userData, firstName: inputValue })
                }
                break

            case 'lastName':
                if (format.test(inputValue) || inputValue == '') {
                    setErrors({ ...errors, lastName: '' })
                    setUserData({ ...userData, lastName: inputValue })
                }
                break
            case 'email':
                const emailFormat = /^[a-z0-9@_.-]+$/i
                if (emailFormat.test(inputValue) || inputValue == '') {
                    setErrors({ ...errors, email: "" })
                    setUserData({ ...userData, email: inputValue })
                }
                break
            case 'password':
                setUserData({ ...userData, password: inputValue })
                if (errors.password === "Укажите пароль" || inputValue.length >= 8) setErrors({ ...errors, password: '' })
                if (inputValue === repeatPassword) setErrors({ ...errors, password: '', repeatPassword: '' })
                break
            case 'repeatPassword':
                setRepeatPassword(inputValue)
                if (errors.repeatPassword === 'Повторите пароль') setErrors({ ...errors, repeatPassword: '' })
                if (inputValue === userData.password) setErrors({ ...errors, repeatPassword: '' })
                break
            default: break
        }
    }

    return (
        <SafeAreaView style={GlobalStyles.safe}>
            <KeyboardAwareScrollView>
                {/* <View style={GlobalStyles.container}> */}
                <View style={styles.registerForm}>
                    <Image source={require('../../assets/logo.png')} style={{ width: 150, height: 150 }} />
                    <Text style={{ fontSize: 26, fontWeight: '700' }}>Регистрация</Text>
                    {errors.server ? <Text>{errors.server}</Text> : null}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Имя</Text>
                        <TextInput
                            style={errors.firstName ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="firstName"
                            type="text"
                            maxLength={50}
                            value={userData.firstName}
                            onChangeText={text => validate("firstName", text)}
                        />
                        {errors.firstName ? <Text style={GlobalStyles.inputError}>{errors.firstName}</Text> : null}

                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Фамилия</Text>
                        <TextInput
                            style={errors.lastName ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="lastName"
                            type="text"
                            maxLength={50}
                            value={userData.lastName}
                            onChangeText={text => validate("lastName", text)}
                        />
                        {errors.lastName ? <Text style={GlobalStyles.inputError}>{errors.lastName}</Text> : null}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Электронная почта</Text>
                        <TextInput
                            style={errors.email ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="email"
                            type="email"
                            textContentType="emailAddress"
                            maxLength={62}
                            value={userData.email}
                            onChangeText={text => validate("email", text)}
                            onBlur={() => {
                                const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                                if (userData.email && !emailFormat.test(userData.email)) setErrors({ ...errors, email: "Неправильный email" })
                                else setErrors({ ...errors, email: '' })
                            }}
                        />
                        {errors.email ? <Text style={GlobalStyles.inputError}>{errors.email}</Text> : null}
                    </View>

                    {/* <View style={styles.formGroup}>
                        <Text style={styles.label} style={styles.label}>Дата рождения</Text>
                        <Text style={styles.inputError}>{errors.birthDate && errors.birthDate}</Text> */}
                    {/* <TextInputMask
                            style={errors.birthDate ? styles.redBorderInput : styles.input}
                            type={'datetime'}
                            options={{
                                format: 'DD-MM-YYYY'
                            }}
                            value={userData.birthDate}
                            onChangeText={text => setUserData({ ...userData, birthDate: text })
                            }
                        /> */}
                    {/* <TextInput
                            style={errors.birthDate ? styles.redBorderInput : styles.input}
                            name="birthDate"
                            maxLength={10}
                            placeholder="дд.мм.гггг"
                            keyboardType="number-pad"
                            value={userData.birthDate}
                            onChangeText={text => {
                                text = text.replace(/\D/g, '')
                                if (text.length >= 2 && text.length < 5) text = text.substring(0, 2) + '-' + text.substring(2, 5)
                                if (text.length >= 5) text = text.substring(0, 2) + '-' + text.substring(2, 5) + '-' + text.substring(5, text.length)
                                //text = text.substring(0, 2) + '-' + text.substring(2, 4) + '-' + text.substring(4, text.length)
                                setUserData({ ...userData, birthDate: text })
                                // /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                            }}
                        /> */}

                    {/* </View> */}

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Пароль</Text>
                        <TextInput
                            style={errors.password ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="password"
                            type="password"
                            textContentType="password"
                            secureTextEntry
                            maxLength={256}
                            value={userData.password}
                            onChangeText={text => validate('password', text)}
                            onBlur={() => {
                                if (userData.password.length !== 0 && userData.password.length < 8) setErrors({ ...errors, password: 'Минимум 8 символов' })
                            }}
                        />
                        {errors.password ? <Text style={GlobalStyles.inputError}>{errors.password}</Text> : null}
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Повторите пароль</Text>
                        <TextInput
                            style={errors.repeatPassword ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="repeatPassword"
                            type="password"
                            textContentType="password"
                            secureTextEntry
                            maxLength={256}
                            value={repeatPassword}
                            onChangeText={text => validate('repeatPassword', text)}
                            onBlur={() => {
                                if (repeatPassword && repeatPassword !== userData.password) setErrors({ ...errors, repeatPassword: 'Пароли не совпадают' })
                            }}
                        />
                        {errors.repeatPassword ? <Text style={GlobalStyles.inputError}>{errors.repeatPassword}</Text> : null}
                    </View>

                    <View style={styles.formGroup}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="red"
                                unfillColor="#FFFFFF"
                                // text="Согласие на получение рассылок по почте"
                                iconStyle={{ borderColor: "red" }}
                                // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                onPress={isChecked => {
                                    setIsChecked(isChecked)
                                    if (isChecked) setErrors({ ...errors, check: '' })
                                }}
                            />
                            <Text style={{}}>Согласие на получение рассылок по почте</Text>
                        </View>
                        {errors.check ? <Text style={GlobalStyles.inputError}>{errors.check}</Text> : null}
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={register}><Text style={styles.buttonText}>Зарегистрироваться</Text></TouchableOpacity>
                        <View style={styles.textCenter}><Text>Уже есть аккаунт?</Text><TouchableOpacity onPress={() => navigation.navigate('login')}><Text style={styles.link}> Войти</Text></TouchableOpacity></View>
                    </View>
                </View>
                {/* </View> */}
            </KeyboardAwareScrollView>

        </SafeAreaView>
    )
}

export default Registration;

const styles = {
    registerForm: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        padding: 30,
        minWidth: 320,
        width: '100%',

        backgroundColor: 'white',
    },
    loginDiv: {
        width: '100%',
        paddingVertical: 50,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.466)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
    },
    input: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5
    },

    redBorderInput: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5
    },
    select: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        height: '100%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5
    },
    redBorderSelect: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        height: '100%',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5
    },
    formGroup: {
        width: '100%',
        flexDirection: 'column',
        position: 'relative',
        padding: 10,
    },
    buttonWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        width: '90%',
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        borderRadius: 10,
        borderColor: 'tomato',
        borderWidth: 1,
        marginBottom: 10
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16,
        color: 'white'
    },
    textCenter: {
        flexDirection: 'row'
    },
    link: {
        color: 'blue'
    }
}