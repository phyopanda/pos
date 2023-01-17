import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { pages } from '../../assets/i18n/mm.json';

export const UpdateComponent = ({ dataSource }) => {

    const [checkUpdate, setCheckUpdate] = useState(false);

    return(
        <>
            <div className='setting-content-wrapper'>
                <h3 className='update-header'> {`${pages.setting.header_title} - ${dataSource.label}`} </h3>

                <div className='update-wrapper'>
                    <div className='current-info'>
                        <h3 className='current-info-title'> လက်ရှိဆော့၀ဲဗားရှင်းအသေးစိတ်အချက်အလက်များ </h3>
                        <div className='detail-info'>
                            <label> Software </label>
                            <span> 0.0.1 (Beta) </span>
                        </div>

                        <div className='detail-info'>
                            <label> Database </label>
                            <span> Mysql (4.3) </span>
                        </div>

                        <div className='detail-info'>
                            <label> Operation System </label>
                            <span> Ubuntu 20.04 LTS (Linux) </span>
                        </div>

                        <div className='detail-info'>
                            <label> RAM </label>
                            <span> 10GB DDR4 1300GHz </span>
                        </div>

                        <div className='detail-info'>
                            <label> HDD </label>
                            <span> 256 Seagate (SSD) </span>
                        </div>
                    </div>

                    <div className='check-update-wrapper'>
                        <h3 className='current-info-title'> အဆင့်မြင့်တင်နိုင်မှုရှိ/မရှိစစ်ဆေးခြင်း </h3>
                        {
                            checkUpdate && (<ProgressBar animated={true} variant={'info'} min={0} max={100} now={40} />)
                        }
                        <Button className='btn btn-update-check' onClick={() => {
                            setCheckUpdate(true);
                            setTimeout(() => {
                                setCheckUpdate(false);
                            }, 3000);
                        }}> Check Update </Button>
                    </div>
                </div>
            </div>

            <div className='setting-content-wrapper'>
                <h3 className='update-header'> အဆင့်မြင့်တင်နိုင်မှုအသေးစိတ် </h3>

                <div className='update-detail-wrapper'>
                    <div className='update-description-wrapper'>
                        <h3> New Aviliable Item List </h3>
                        <p> New Aviliable Item List. New Aviliable Item List. New Aviliable Item List. New Aviliable Item List. New Aviliable Item List</p>
                        <Button className='btn-small-update'> Update </Button>
                    </div>

                    <div className='update-description-wrapper'>
                        <h3> New Aviliable Item List </h3>
                        <p> New Aviliable Item List. New Aviliable Item List. New Aviliable Item List. New Aviliable Item List. New Aviliable Item List</p>
                        <Button className='btn-small-update'> Update </Button>
                    </div>

                    <div className='update-description-wrapper'>
                        <h3> New Aviliable Item List </h3>
                        <p> New Aviliable Item List. New Aviliable Item List. New Aviliable Item List. New Aviliable Item List. New Aviliable Item List</p>
                        <Button className='btn-small-update'> Update </Button>
                    </div>
                </div>
            </div>
        </>
    )

}