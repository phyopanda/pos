import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const AnalyticsComponent = ({ dataSource }) => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [item, setItems] = useState('');

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource);
        }
    },[dataSource]);

    return(
        <>
        </>
    )
}