import React, {useState, useContext, useCallback, useEffect} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../Loader/Loader";
import {LinksList} from "../LinksList/LinksList";


export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const fethLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/links', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLinks(fetched)
        } catch (e) {
        }
    }, [token, request]);
    useEffect(() => {
        fethLinks()
    }, [fethLinks])
    if (loading) {
        return <Loader/>
    }
    return (
        <>
        {!loading && <LinksList links={links}/>}
        </>
    )
}