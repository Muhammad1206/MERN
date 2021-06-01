import React, {useState, useCallback, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../Loader/Loader";
import {LinkCard} from "../LinkCard/LinkCard";
import {AuthContext} from "../../context/AuthContext";


export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {loadind, request} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(
        async () => {
            try {
                const fetched = await request(`/api/links/${linkId}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                });
                setLink(fetched);
            } catch (e) {}
        },
        [token, request, linkId],
    );
    useEffect(() => {
        getLink()
    }, [getLink]);
    if (loadind) {
        return <Loader/>
    }
    return (
        <>
        {!loadind && link && <LinkCard link={link}/>}
        </>
    )
};