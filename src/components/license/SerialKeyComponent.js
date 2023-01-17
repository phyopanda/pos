import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { messageBoxType } from "../../utilities/native.utility";
import { zawgyi } from "../../utilities/translation.utility";
import { useSelector } from "react-redux";
import { t } from "i18next";

export const SerialKeyComponent = ({ retriveSerialKey }) => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [key01, setKey01] = useState('');
    const [key02, setKey02] = useState('');
    const [key03, setKey03] = useState('');
    const [key04, setKey04] = useState('');
    const [key05, setKey05] = useState('');
    const [key06, setKey06] = useState('');

    const messageboxTitle = t('license-key');

    const submit = () => {
        const { nativeApi } = window;

        if(key01 === '' || key02 === '' || key03 === '' || key04 === '' || key05 === '' || key06 === '') {
            nativeApi.messageBox.open({ title: messageboxTitle, message: t('license-key-is-required'), type: messageBoxType.info});
            return;
        }

        if(key01.length < 4 || key02.length < 4 || key03.length < 4 || key04.length < 4 || key05.length < 4 || key06.length < 4) {
            nativeApi.messageBox.open({ title: messageboxTitle, message: t('invalid-license-key'), type: messageBoxType.info});
            return;
        }

        const serialNumber = `${key01}-${key02}-${key03}-${key04}-${key05}-${key06}`;

        retriveSerialKey(serialNumber);
    }

    return (
        <div className="d-md-flex flex-md-column">
            <label className={`${zawgyi(lang)} title-default`}> {t('license-key')} </label>

            <div className="d-md-flex flex-md-row">
                <InputGroup>
                    <FormControl
                        className="serial-key-input"
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key01}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey01(e.target.value.toUpperCase())}
                    />

                    <FormControl
                        className="serial-key-input"
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key02}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey02(e.target.value.toUpperCase())}
                    />

                    <FormControl
                        className="serial-key-input"
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key03}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey03(e.target.value.toUpperCase())}
                    />

                    <FormControl
                        className="serial-key-input"
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key04}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey04(e.target.value.toUpperCase())}
                    />

                    <FormControl
                        className="serial-key-input"
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key05}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey05(e.target.value.toUpperCase())}
                    />

                    <FormControl
                        className="serial-key-input"
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key06}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey06(e.target.value.toUpperCase())}
                    />

                    <Button className={`${zawgyi(lang)} btn btn-samll btn-border-right mb-3`} onClick={() => submit()}> {t('confirm')} </Button>
                </InputGroup>
            </div>
        </div>
    )
}