import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { t, zawgyi } from "../../utilities/translation.utility";

export const SideSectionComponent = () => {

    const state = useSelector(state => state);
    const { lang } = state;

    const openWebUrl = (url) => {
        const { nativeApi } = window;

        nativeApi.webView.open(url);
    }

    return(
        <div className='d-flex flex-column justify-content-center align-items-center background-opacity-layout'>
            <div className='description-card'>
                <h3 className={`title-default ${zawgyi(lang)}`}> {t('title-intro')} </h3>
                <p className={`text ${zawgyi(lang)}`}>  {t('description-intro')} </p>

                <Button className='btn btn-border' onClick={() => openWebUrl('https://agritechpos.com')}> {t('btn-detail')} </Button>
            </div>
        </div>
    )
}