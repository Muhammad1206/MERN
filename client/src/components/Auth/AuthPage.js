import React, {useState, useEffect, useContext} from 'react'
import "../../App.css"
import { AuthContext } from '../../context/AuthContext';
import {useHttp} from "../../hooks/http.hook";
import { useMessage } from '../../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const  {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
         message(error);
         clearError()
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
    };
    const  registerHandler = async () => {
        try {
            const data = await  request('/api/auth/register', 'POST', {...form});
            message(data.message)
        }catch (e) {

        }
    };
    const  loginHandler = async () => {
        try {
            const data = await  request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        }catch (e) {}
    };
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue accent-2">
                    <div className="card-content black-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-feild ">
                               <input
                               placeholder="Введите email" 
                               type="email" 
                               id="email"
                               name="email"
                               value={form.email}
                               onChange={changeHandler}/>
                               <label htmlFor="email"
                                      className="black-text"
                               >
                                   Email
                               </label>
                            </div>
                            <div className="input-feild">
                               <input
                               placeholder="Введите пароль" 
                               type="password" 
                               id="password"
                               name="password"
                               value={form.password}
                               onChange={changeHandler}
                               disabled = {loading}/>
                                
                               <label
                                   htmlFor="password"
                                   className="black-text"
                               >
                                   Password
                               </label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                        className="btn yellow darken-4"
                        onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn green darken-1 black-text "
                            style={{ marginLeft: 10 }}
                            onClick={registerHandler}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}