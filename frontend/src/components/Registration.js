import React from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormGroup, Label, Input, FormFeedback, Col, Row } from 'reactstrap'
import AuthContext from '../context/AuthContext'

const Registration = () => {
    const context = React.useContext(AuthContext)
    const navigate = useNavigate()

    const [userData, setUserData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        language: 'Русский',
        password: ''
    })

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

    const [repeatPassword, setRepeatPassword] = React.useState('')
    const [check, setCheck] = React.useState(false)

    const handleClick = async (e) => {
        e.preventDefault()
        let is_empty = false
        const errorsCopy = Object.assign({}, errors)

        if (!check) {
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
        if (!userData.language) {
            errorsCopy.language = 'Выберите Язык'
            is_empty = true
        }
        if (!userData.birthDate) {
            errorsCopy.birthDate = 'Укажите дату'
            is_empty = true
        }
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
        }
        else {
            await fetch('http://192.168.2.114:8000/registration', {
                method: "POST",
                header: {
                    "Content-Type": "applications/json",
                },
                body: JSON.stringify(userData)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.isRegistered) {
                        context.setIsAuthentificated(true)
                        navigate("/login")
                    } else {
                        console.log('Errorrrr')
                        setErrors({ ...errors, common: data.error })
                    }
                });
        }

    }

    const validate = (e) => {
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        switch (e.target.name) {
            case 'email':
                const emailFormat = /[!#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/;

                if (emailFormat.test(e.target.value)) setErrors({ ...errors, email: 'Недопустимые символы' })
                else {
                    setErrors({ ...errors, email: "" })
                    setUserData({ ...userData, email: e.target.value })
                }
                break
            case 'firstName':

                if (format.test(e.target.value)) setErrors({ ...errors, firstName: 'Недопустимые символы' })
                else {
                    setErrors({ ...errors, firstName: '' })
                    setUserData({ ...userData, firstName: e.target.value })
                }
                break

            case 'lastName':
                if (format.test(e.target.value)) setErrors({ ...errors, lastName: 'Недопустимые символы' })
                else {
                    setErrors({ ...errors, lastName: '' })
                    setUserData({ ...userData, lastName: e.target.value })
                }
                break
            case 'password':
                if (e.target.value.length !== 0 && e.target.value.length < 8) setErrors({ ...errors, password: 'Менее 8 символов' })
                break
            case 'repeatPassword':
                if (e.target.value !== userData.password) setErrors({ ...errors, repeatPassword: 'Пароли не совпадают' })
                break
            default: break
        }
    }

    return <div className='container'>
        <div className="shadow" style={styles.loginDiv}>
            <img src={logo} alt="logo" style={styles.logo} />
            <h1 style={{ marginBottom: 20 }}>Регистрация</h1>
            <form method='POST' style={{ width: '80%' }}>
                <div style={styles.row}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="firstName">Имя</label>
                        {errors.firstName && <span style={styles.inputError}>{errors.firstName}</span>}
                        <input
                            style={errors.firstName ? styles.redBorderInput : styles.input}
                            name="firstName"
                            type="text"
                            maxLength={50}
                            onChange={e => validate(e)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="lastName">Фамилия</label>
                        {errors.lastName && <span style={styles.inputError}>{errors.lastName}</span>}
                        <input
                            style={errors.lastName ? styles.redBorderInput : styles.input}
                            name="lastName"
                            type="text"
                            maxLength={50}
                            onChange={e => validate(e)}
                        />

                    </div>
                </div>

                <div style={styles.formGroup} >
                    <label style={styles.label} htmlFor="email">Электронная почта</label>
                    {errors.email && <span style={styles.inputError}>{errors.email}</span>}
                    <input
                        style={errors.email ? styles.redBorderInput : styles.input}
                        name="email"
                        type="email"
                        maxLength={62}
                        onChange={e => validate(e)}
                    />
                </div>

                <div style={styles.row}>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="birthDate">Дата рождения</label>
                        {errors.birthDate && <span style={styles.inputError}>{errors.birthDate}</span>}
                        <input
                            style={errors.birthDate ? styles.redBorderInput : styles.input}
                            name="birthDate"
                            type="date"
                            onChange={e => setUserData({ ...userData, birthDate: e.target.value })}
                        />

                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="language">Язык</label>
                        {errors.language && <span style={styles.inputError}>{errors.language}</span>}
                        <select
                            style={errors.language ? styles.redBorderSelect : styles.select}
                            name="language"
                            onChange={e => setUserData({ ...userData, language: e.target.value })}
                        >
                            <option>Русский</option>
                            <option>Английский</option>
                        </select>

                    </div>

                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="password">Пароль</label>
                    {errors.password && <span style={styles.inputError}>{errors.password}</span>}
                    <input
                        style={errors.password ? styles.redBorderInput : styles.input}
                        name="password"
                        type="password"
                        maxLength={256}
                        onChange={e => {
                            if (errors.password === "Укажите пароль" || e.target.value.length >= 8) {
                                setErrors({ ...errors, password: '' })
                                setUserData({ ...userData, password: e.target.value })
                            }
                        }}
                        onBlur={e => validate(e)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="repeatPassword">Повторите пароль</label>
                    {errors.repeatPassword && <span style={styles.inputError}>{errors.repeatPassword}</span>}
                    <input
                        style={errors.repeatPassword ? styles.redBorderInput : styles.input}
                        name="repeatPassword"
                        type="password"
                        maxLength={256}
                        onChange={e => {
                            if (errors.repeatPassword === 'Повторите пароль') setErrors({ ...errors, repeatPassword: '' })
                            if (e.target.value === userData.password) {
                                setErrors({ ...errors, repeatPassword: '' })
                                setRepeatPassword(e.target.value)
                            }
                        }}
                        onBlur={e => validate(e)}
                    />

                </div>
                {errors.check && <span style={styles.inputError}>{errors.check}</span>}
                <input
                    id="permissionCheckBox"
                    style={{ bottom: 0 }}
                    type="checkbox"
                    onChange={e => {
                        if (e.target.checked) setErrors({ ...errors, check: '' })
                        setCheck(e.target.checked)
                    }}
                />
                <label>Согласие на получение рассылок по почте</label>
                <button style={styles.button} onClick={e => handleClick(e)}>Зарегистрироваться</button>
                <div style={{ width: '100%', textAlign: 'center' }}><span>Уже есть аккаунт? <Link to="/login">Войти</Link></span></div>

            </form>
        </div>
    </div>
}

export default Registration

const styles = {
    loginDiv: {
        padding: 20,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        border: '1px solid rgba(128, 128, 128, 0.466)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 200,
        marginBottom: 20
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
    input: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        backgroundColor: 'none',
        border: '1px solid grey',
        borderRadius: 5
    },

    redBorderInput: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        backgroundColor: 'none',
        border: '1px solid red',
        borderRadius: 5
    },
    select: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        height: '100%',
        background: 'none',
        border: '1px solid grey',
        borderRadius: 5
    },
    redBorderSelect: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        height: '100%',
        background: 'none',
        border: '1px solid red',
        borderRadius: 5
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: 10,
        flex: 1
    },
    inputError: {
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: '50%',
        bottom: -5,
        transform: 'translate(-50%, 100%)',
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 12,
        backgroundColor: 'rgba(216, 24, 24, 0.698)',
        borderRadius: 5,
        color: 'white'
    },
    button: {
        width: '100%',
        backgroundColor: 'tomato',
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        borderRadius: 10,
        border: '1px solid tomato',
        color: 'white',
        fontSize: 14,
        fontWeight: 700,
        margin: 10,
        alignSelf: 'center',
    }
}