import React from 'react'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import GlobalStyles from '../../GlobalStyles';
import { Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'
import View from '../../components/View';
import Image from '../../components/Image';
import TextInput from '../../components/TextInput';
import TouchableOpacity from '../../components/TouchableOpacity';
import Text from '../../components/Text';


const LoginPage = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = React.useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = React.useState({
        common: '',
        email: '',
        password: ''
    })

    const context = React.useContext(AuthContext)

    const login = async (e) => {
        e.preventDefault()
        try {
            await fetch("http://192.168.2.114:8000/login", {
                method: "POST",
                header: {
                    "Content-Type": "applications/json",
                },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.isAuthenticated) {
                        context.setIsAuthentificated(true)
                        navigate('/home')
                    } else {
                        setErrors({ ...errors, common: data.error })
                    }
                });
        } catch (error) {
            console.log("Ошибка", error);
        }
    }

    return <View style={GlobalStyles.container}>

        <View style={styles.loginForm}>
            <Image source={logo} alt="logo" style={{ width: 150, height: 150, marginBottom: 10 }} />
            <TextInput
                style={GlobalStyles.input}
                name="email"
                placeholder='Email'
                type="email"
                onChange={e => setUserData({ ...userData, email: e.target.value })}
            />

            <TextInput
                style={GlobalStyles.input}
                placeholder="Пароль"
                name="password"
                type="password"
                onChange={e => setUserData({ ...userData, password: e.target.value })}
            />

            <TouchableOpacity style={GlobalStyles.button} onClick={login}>Войти</TouchableOpacity>
            <Text>Нет аккаунта? <Link to="/registration">Регистрация</Link></Text>
            <Link to="/">Забыли пароль?</Link>
        </View>
    </View>
}

export default LoginPage

const styles = {
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        padding: 30,
        minWidth: 320,
        width: 'calc(60% - 60px)',

        backgroundColor: 'white',
        borderRadius: 15
    },

}

