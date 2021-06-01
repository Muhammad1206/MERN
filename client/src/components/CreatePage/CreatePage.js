import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import  {useHistory} from 'react-router-dom';


export  const  CreatePage = () => {
    const history =  useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');
    useEffect(()=>{
        window.M.updateTextFields()
    }, []);


    const pressHandler = async event => {
    if(event.key === 'Enter') {
        try  {
         const data = await request('/api/links/generate', 'POST', {from:link}, {
             Authorization: `Bearer ${auth.token}`
         });
         history.push(`./detail/${data.link._id}`);
        }catch (e) {}
    }
    }
    return (
        <div className="row">
            <div className="col s8 ofset-s2" style={{paddingTop: '2rem'}}>
                <input
                    placeholder="Вставьте ссылку"
                    type="text"
                    id="link"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor="link">Введите ссылку</label>
            </div>
        </div>
    )
}