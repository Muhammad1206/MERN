import React from 'react';

export const LinkCard = ({link}) => {
    return (
        <div>
            <h2>Сылка</h2>
            <p>Ваша ссылка: <a href={link.to} target= "_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создание: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </div>
    )
};