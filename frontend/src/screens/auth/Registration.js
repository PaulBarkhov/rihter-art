import React from 'react'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Label, Input, FormFeedback, Col, Row } from 'reactstrap'
import AuthContext from '../../context/AuthContext'
import View from '../../components/View'
import GlobalStyles from '../../GlobalStyles'
import Image from '../../components/Image'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import TouchableOpacity from '../../components/TouchableOpacity'

const Registration = () => {
    const context = React.useContext(AuthContext)
    const navigate = useNavigate()

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
        birthDate: '',
        language: '',
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
                    if (res.status === 200) navigate('/registrationVerification', { userData: userData })
                })
        }

    }

    const validate = (inputName, inputValue) => {
        // const format = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        const format = /^[a-zа-я ,.'-]+$/i

        switch (inputName) {
            case 'firstName':

                // setUserData({ ...userData, firstName: inputValue.replace(format, '') })
                if (format.test(inputValue) || inputValue === '') {
                    setErrors({ ...errors, firstName: '' })
                    setUserData({ ...userData, firstName: inputValue })
                }
                break

            case 'lastName':
                if (format.test(inputValue) || inputValue === '') {
                    setErrors({ ...errors, lastName: '' })
                    setUserData({ ...userData, lastName: inputValue })
                }
                break
            case 'email':
                const emailFormat = /^[a-z0-9@_.-]+$/i
                if (emailFormat.test(inputValue) || inputValue === '') {
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

    return <View style={GlobalStyles.container}>
        <View style={styles.registerForm}>
            <Image source={logo} alt="logo" style={{ width: 150, height: 150, marginBottom: 10 }} />
            <Text style={{ marginBottom: 20, fontSize: 30, fontWeight: '700' }}>Регистрация</Text>
            {errors.server ? <Text>{errors.server}</Text> : null}
            <View style={{ width: '80%', flexDirection: 'column' }}>
                <View style={styles.row}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Имя</Text>
                        <TextInput
                            style={errors.firstName ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="firstName"
                            type="text"
                            maxLength={50}
                            value={userData.firstName}
                            onChange={e => validate(e.target.name, e.target.value)}
                        />
                        {errors.firstName && <Text style={GlobalStyles.inputError}>{errors.firstName}</Text>}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Фамилия</Text>
                        <TextInput
                            style={errors.lastName ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="lastName"
                            type="text"
                            maxLength={50}
                            value={userData.lastName}
                            onChange={e => validate(e.target.name, e.target.value)}
                        />
                        {errors.lastName && <Text style={GlobalStyles.inputError}>{errors.lastName}</Text>}
                    </View>
                </View>

                <View style={styles.formGroup} >
                    <Text style={styles.label} >Электронная почта</Text>
                    <TextInput
                        style={errors.email ? GlobalStyles.redBorderInput : GlobalStyles.input}
                        name="email"
                        type="email"
                        maxLength={62}
                        value={userData.email}
                        onChange={e => validate(e.target.name, e.target.value)}
                        onBlur={() => {
                            const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                            if (userData.email && !emailFormat.test(userData.email)) setErrors({ ...errors, email: "Неправильный email" })
                            else setErrors({ ...errors, email: '' })
                        }}
                    />
                    {errors.email && <Text style={GlobalStyles.inputError}>{errors.email}</Text>}
                </View>

                {/* <View style={styles.row}>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Дата рождения</Text>
                        {errors.birthDate && <Text style={GlobalStyles.inputError}>{errors.birthDate}</Text>}
                        <TextInput
                            style={errors.birthDate ? GlobalStyles.redBorderInput : GlobalStyles.input}
                            name="birthDate"
                            type="date"
                            onChange={e => setUserData({ ...userData, birthDate: e.target.value })}
                        />

                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Язык</Text>
                        {errors.language && <Text style={GlobalStyles.inputError}>{errors.language}</Text>}
                        <select
                            style={errors.language ? styles.redBorderSelect : styles.select}
                            name="language"
                            onChange={e => setUserData({ ...userData, language: e.target.value })}
                        >
                            <option>Русский</option>
                            <option>Английский</option>
                        </select>

                    </View>

                </View> */}

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Пароль</Text>
                    <TextInput
                        style={errors.password ? GlobalStyles.redBorderInput : GlobalStyles.input}
                        name="password"
                        type="password"
                        maxLength={256}
                        value={userData.password}
                        onChange={e => validate(e.target.name, e.target.value)}
                        onBlur={() => {
                            if (userData.password.length !== 0 && userData.password.length < 8) setErrors({ ...errors, password: 'Минимум 8 символов' })
                        }} />
                    {errors.password && <Text style={GlobalStyles.inputError}>{errors.password}</Text>}
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Повторите пароль</Text>
                    <TextInput
                        style={errors.repeatPassword ? GlobalStyles.redBorderInput : GlobalStyles.input}
                        name="repeatPassword"
                        type="password"
                        maxLength={256}
                        value={repeatPassword}
                        onChange={e => validate(e.target.name, e.target.value)}
                        onBlur={() => {
                            if (repeatPassword && repeatPassword !== userData.password) setErrors({ ...errors, repeatPassword: 'Пароли не совпадают' })
                        }}
                    />
                    {errors.repeatPassword && <Text style={GlobalStyles.inputError}>{errors.repeatPassword}</Text>}
                </View>
                <View style={styles.formGroup}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <input
                            id="permissionCheckBox"
                            type="checkbox"
                            onChange={e => {
                                setIsChecked(e.target.checked)
                                if (e.target.checked) setErrors({ ...errors, check: '' })
                            }}
                        />
                        <Text>Согласие на получение рассылок по почте</Text>
                    </View>

                    {errors.check && <Text style={GlobalStyles.inputError}>{errors.check}</Text>}
                </View>

                <TouchableOpacity style={GlobalStyles.button} onClick={register}><Text>Зарегистрироваться</Text></TouchableOpacity>
                <div style={{ width: '100%', textAlign: 'center' }}><span>Уже есть аккаунт? <Link to="/login">Войти</Link></span></div>

            </View>
        </View>
    </View>
}

export default Registration

const styles = {
    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        padding: '30px 0',
        minWidth: 320,
        width: '100%',

        backgroundColor: 'white',
        borderRadius: 15
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    label: {
        fontWeight: 700,
    },

    // select: {
    //     paddingLeft: 10,
    //     paddingTop: 5,
    //     paddingRight: 10,
    //     paddingBottom: 5,
    //     height: '100%',
    //     background: 'none',
    //     border: '1px solid grey',
    //     borderRadius: 5
    // },
    // redBorderSelect: {
    //     paddingLeft: 10,
    //     paddingTop: 5,
    //     paddingRight: 10,
    //     paddingBottom: 5,
    //     height: '100%',
    //     background: 'none',
    //     border: '1px solid red',
    //     borderRadius: 5
    // },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: 10,
        flex: 1,
        minWidth: 250
    },

}