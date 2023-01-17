import React from "react";
import { Button } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";

export const Retry = ({props, reload}) => {
    const { lang } = props.reducer;

    return(
        <div className="card-retry"> 
            <span className={`color-primary ${zawgyi(lang)}`}> {t('retry-message')} </span>
            <Button className={`btn-small ${zawgyi(lang)}`} onClick={reload}> {t('btn-retry')} </Button>
        </div>
    )
}