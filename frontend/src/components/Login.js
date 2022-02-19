import React from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'


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
                        console.log('success')
                        navigate('/home')
                    } else {
                        console.log(data.error)
                        setErrors({ ...errors, common: data.error })
                    }
                });
        } catch (error) {
            console.log("Ошибка", error);
        }
    }

    return <div className='container'>
        <div className='loginDiv'>
            <img src={logo} alt="logo" className='logo' />

            <Form>
                <FormGroup >
                    <Label className='label' for="email">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        invalid={errors.email.length > 0}
                    />
                    <FormFeedback invalid tooltip>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label className='label' for="password">Пароль</Label>
                    <Input
                        name="password"
                        type="password"
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                    />
                </FormGroup>

                <button className='button' onClick={e => login(e)}>Войти</button>
                <span>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></span>
            </Form>

        </div>
    </div>
}

export default LoginPage

