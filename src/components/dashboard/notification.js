import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { BsArrowRightShort } from "react-icons/bs";

export const DashboardNotiCompoment = ({ props, notification }) => {
    const { lang } = props.reducer;
    const { history } = props;

    return(
        <div className="d-flex flex-column">
            {notification.shop === true && (
                <Alert 
                    className="m-3"
                    variant="warning"
                >
                    <Alert.Heading className={`${zawgyi(lang)}`}> {t('dashboard-alert-shop-title')} </Alert.Heading>
                    <p className={`${zawgyi(lang)}`}> {t('dashboard-alert-shop-description')} </p>
                    <Button
                        onClick={() => history.push('/setting?component=ShopComponent')}
                    >
                        <span className="me-3"> {t('dashboard-alert-shop-btn')} </span>
                        <BsArrowRightShort size={30} />
                    </Button>
                </Alert>
            )}
        </div>
    )

}