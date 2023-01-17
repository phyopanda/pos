import numeral from 'numeral';
import React, { useEffect, useState } from 'react'
import { Card, FormControl, FormLabel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { t, zawgyi } from '../../utilities/translation.utility';

const ShowDeviceSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [cpuModel, setCpuModel] = useState('');
    const [cpuSpeed, setCpuSpeed] = useState(0);
    const [cpuNo, setCpuNo] = useState(0);
    const [hostname , setHostName] = useState('');
    const [ram , setRam] = useState(0);

    const device = () => {
        const { nativeApi } = window;

        nativeApi.device.get((data) => {
            const getCpu = data.cpus();
            const model = getCpu.map(e => e.model);
            const speed = getCpu.map(e => e.speed);
            const host = data.hostname();
            const totalRam = data.totalmem();
            const totalRamGb = numeral(totalRam).divide(1073741824).format('0,0');

            setCpuModel(model[0]);
            setCpuSpeed(speed[0]);
            setCpuNo(getCpu.length);
            setHostName(host);
            setRam(totalRamGb);
        });
    }

    useEffect(() => {
        device()
    }, [])
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('title-device')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <label> {t('cpu-model')} </label>
                        <label> {cpuModel} </label>
                    </div>

                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <label> {t('cpu-speed')} </label>
                        <label> {`${cpuSpeed}s`} </label>
                    </div>

                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <label> {t('cpu-cores')} </label>
                        <label> {`${cpuNo} Threads`} </label>
                    </div>

                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <label> {t('host')} </label>
                        <label> {hostname} </label>
                    </div>

                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <label> {t('ram')} </label>
                        <label> {`${ram} GB`} </label>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default ShowDeviceSetting;