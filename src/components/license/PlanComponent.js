import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useSelector } from 'react-redux';
import { zawgyi, t } from "../../utilities/translation.utility";
import { messageBoxType } from '../../utilities/native.utility';
import moment from "moment";

export const PlanComponent = ({ retrivePlan, backStep }) => {
    
    const state = useSelector(state => state);
    const { lang } = state;
    const { nativeApi } = window;

    const [activation, setActivation] = useState(moment().format('Y-MM-DD'));
    const [duration, setDuration] = useState(1);
    const [device, setDevice] = useState(1);

    const messageTitle = t('title-plan');

    const NumOfPC = () => {
        let pcs = [];
        for(let x=1; x<=10; x++) {
            pcs.push(x);
        }
        return pcs;
    }

    const lifeTime = () => {
        let duration = [];
        for(let x=1; x<=5; x++) {
            duration.push(x);
        }
        return duration;
    }

    const submit = () => {
        if(activation === '' || duration === '' || device === '') {
            nativeApi.messageBox.open({title: messageTitle, message: t('all-fields-are-requried'), type: messageBoxType.info});
            return;
        }

        if(moment(moment().format('Y-MM-DD')).isAfter(activation)) {
            nativeApi.messageBox.open({title: messageTitle, message: t('invalid-date'), type: messageBoxType.info});
            return;
        }
        
        const planData = {
            activated_at: activation,
            duration: duration,
            device: device
        }

        retrivePlan(planData);
    }

    return (
        <div className="d-md-flex flex-md-column">

            <div className="d-flex flex-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('user-info')} />
                <p className={`${zawgyi(lang)} mt-3 mb-3`}> {t('description-planinfo')} </p>
            </div>

            <div className="d-md-flex flex-md-column justify-content-start mb-3">
                <Form.Group className="mb-3">
                    <Form.Label className={`${zawgyi(lang)}`}> {t('label-activation-date')}</Form.Label>
                    <Form.Control
                        type="date"
                        value={activation}
                        onChange={(e) => setActivation(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className={`${zawgyi(lang)}`}> {t('label-service-life')} </Form.Label>
                    <Form.Control 
                        className="select-device"
                        as="select"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        {lifeTime().map((value, index) => {
                            return(
                                <option key={`duration_id_${index}`} value={value}> {value} </option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className={`${zawgyi(lang)}`}> {t('label-device')} </Form.Label>
                    <Form.Control
                        className="select-device"
                        as="select"
                        value={device}
                        onChange={(e) => setDevice(e.target.value)}
                    >
                        {NumOfPC().map((value, index) => {
                            return(
                                <option key={`pc_id_${index}`} value={value}> {value} </option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button className={`${zawgyi(lang)}`} onClick={() => submit()}> {t('confirm')} </Button>
            </div>
        </div>
    )
}