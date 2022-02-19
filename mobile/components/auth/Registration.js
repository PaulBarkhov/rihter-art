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

    const [repeatPassword, setRepeatPassword] = useState('')
    const [isChecked, setIsChecked] = React.useState(false)

    const [errors, setErrors] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        language: '',
        password: '',
        repeatPassword: '',
        check: ''
    })

    const register = async () => {
        // if (!userData.email) {
        //     setErrorMessage('Введите Email')
        //     return
        // }
        // if (!userData.password) {
        //     setErrorMessage('Введите пароль')
        //     return
        // }
        // if (!passwordConfirmation) {
        //     setErrorMessage('Повторите пароль')
        //     return
        // }
        // if (userData.password !== passwordConfirmation) {
        //     setErrorMessage('Пароли не совпадают')
        //     return
        // }
        await fetch(`http://192.168.2.114:8000/verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify({ email: userData.email })
        })
            .then(res => res.status === 200 && navigation.navigate('registrationVerification', { userData: userData }))
    }

    return (
        <KeyboardAwareScrollView>
            <View style={GlobalStyles.container}>
                <View style={styles.loginDiv}>
                    <Image source={require('../../assets/logo.png')} style={{ width: 150, height: 150 }} />
                    {/* <Image src={logo} alt="logo" style={styles.logo} /> */}
                    <Text style={{ fontSize: 26, fontWeight: '700' }}>Регистрация</Text>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Имя</Text>
                        <Text style={styles.inputError}>{errors.firstName && errors.firstName}</Text>
                        <TextInput
                            style={errors.firstName ? styles.redBorderInput : styles.input}
                            name="firstName"
                            type="text"
                            maxLength={50}
                            // onChangeText={e => validate(e)}
                            onChangeText={text => setUserData({ ...userData, firstName: text })}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Фамилия</Text>
                        <Text style={styles.inputError}>{errors.lastName && errors.lastName}</Text>
                        <TextInput
                            style={errors.firstName ? styles.redBorderInput : styles.input}
                            name="lastName"
                            type="text"
                            maxLength={50}
                            // onChangeText={e => validate(e)}
                            onChangeText={text => setUserData({ ...userData, lastName: text })}

                        />

                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Электронная почта</Text>
                        <Text style={styles.inputError}>{errors.email && errors.email}</Text>
                        <TextInput
                            style={errors.email ? styles.redBorderInput : styles.input}
                            name="email"
                            type="email"
                            maxLength={62}
                            // onChangeText={e => validate(e)}
                            onChangeText={text => setUserData({ ...userData, email: text })}
                        />
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
                        <Text style={styles.inputError}>{errors.password && errors.password}</Text>
                        <TextInput
                            style={errors.password ? styles.redBorderInput : styles.input}
                            name="password"
                            type="password"
                            maxLength={256}
                            onChangeText={e => {
                                if (errors.password === "Укажите пароль" || e.target.value.length >= 8) {
                                    setErrors({ ...errors, password: '' })
                                    setUserData({ ...userData, password: e.target.value })
                                }
                            }}
                            // onBlur={e => validate(e)}
                            onChangeText={text => setUserData({ ...userData, password: text })}

                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Повторите пароль</Text>
                        <Text style={styles.inputError}>{errors.repeatPassword && errors.repeatPassword}</Text>
                        <TextInput
                            style={errors.repeatPassword ? styles.redBorderInput : styles.input}
                            name="repeatPassword"
                            type="password"
                            maxLength={256}
                            onChangeText={e => {
                                if (errors.repeatPassword === 'Повторите пароль') setErrors({ ...errors, repeatPassword: '' })
                                if (e.target.value === userData.password) {
                                    setErrors({ ...errors, repeatPassword: '' })
                                    setRepeatPassword(e.target.value)
                                }
                            }}
                            // onBlur={e => validate(e)}
                            onChangeText={text => setRepeatPassword(text)}

                        />

                    </View>
                    {/* <View style={styles.formGroup}>
                        <Text style={styles.inputError}>{errors.check && errors.check}</Text>
                        <TextInput
                            id="permissionCheckBox"
                            style={{ bottom: 0 }}
                            type="checkbox"
                            onChangeText={e => {
                                if (e.target.checked) setErrors({ ...errors, check: '' })
                                setCheck(e.target.checked)
                            }}
                        />
                    </View> */}

                    <View style={styles.formGroup}>
                        <CheckBox
                            style={{ flex: 1, padding: 10 }}
                            onClick={() => setIsChecked(!isChecked)}
                            isChecked={isChecked}
                            rightText={"Согласие на получение рассылок по почте"}
                        />
                    </View>

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={register}><Text style={styles.buttonText}>Зарегистрироваться</Text></TouchableOpacity>
                        <View style={styles.textCenter}><Text>Уже есть аккаунт?</Text><TouchableOpacity onPress={() => navigation.navigate('login')}><Text style={styles.link}> Войти</Text></TouchableOpacity></View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
        // <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        //     <View style={styles.form}>
        //         <Text style={styles.header}>Регистрация</Text>
        //         {errorMessage ? <Text>{errorMessage}</Text> : null}
        //         <TextInput
        //             style={styles.input}
        //             placeholder="Email"
        //             onChangeText={(text) => setUserData({ ...userData, email: text })}
        //         />
        //         <TextInput
        //             style={styles.input}
        //             placeholder="Пароль"
        //             onChangeText={(text) => setUserData({ ...userData, password: text })}
        //         />
        //         <TextInput
        //             style={styles.input}
        //             placeholder="Повторите пароль"
        //             onChangeText={(text) => setPasswordConfirmation(text)}
        //         />
        //         <TouchableOpacity style={styles.button} onPress={register}>
        //             <Text style={styles.text}>Зарегистрироваться</Text>
        //         </TouchableOpacity>
        //     </View>
        // </KeyboardAvoidingView>
    );
};

export default Registration;


const styles = {
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
    logo: {
        // height: 200,
        // marginBottom: 20
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: -10
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
    inputError: {
        // position: 'absolute',
        // whiteSpace: 'nowrap',
        // left: '50%',
        // bottom: -5,
        // transform: 'translate(-50%, 100%)',
        // paddingLeft: 10,
        // paddingTop: 5,
        // paddingRight: 10,
        // paddingBottom: 5,
        // fontSize: 12,
        // backgroundColor: 'rgba(216, 24, 24, 0.698)',
        // borderRadius: 5,
        // color: 'white'
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "tomato",
//     },
//     form: {
//         padding: 30,
//         width: Dimensions.get("screen").width - 60,
//         backgroundColor: "white",
//         alignItems: "center",
//         justifyContent: "space-between",
//         borderRadius: 15,
//     },
//     header: {
//         fontSize: 30,
//         marginBottom: 30,
//         fontFamily: "sans-serif",
//         fontWeight: "700",
//         color: "black",
//     },
//     input: {
//         borderColor: "black",
//         borderWidth: 1,
//         borderRadius: 8,
//         width: "100%",
//         padding: 5,
//         paddingHorizontal: 10,
//         marginBottom: 10,
//         backgroundColor: "white",
//         fontFamily: "sans-serif",
//     },
//     button: {
//         backgroundColor: "red",
//         width: "100%",
//         padding: 10,
//         marginVertical: 10,
//         borderRadius: 10,
//     },
//     text: {
//         textAlign: "center",
//         color: "white",
//         fontFamily: "sans-serif",
//         fontSize: 16,
//         fontWeight: "700",
//     },
// });
