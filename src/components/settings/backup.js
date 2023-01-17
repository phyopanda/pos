import React from 'react'
import { Button, Card, Dropdown } from 'react-bootstrap'
import moment from 'moment'
import '../../assets/css/theme.css'
import BackupTableList from './backupTableList';

const todayDate = moment().format('LTS');

const BackUpComponent = ({ props }) => {
    return (
        <>
            <div className='row mt-3'>
                <div className='col-md-3'>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                Backup Schedule Setting
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <h5>Time</h5>
                            <div className='row justify-content-center border'>{todayDate}</div>
                            <h5 className='mt-3'>Schedule</h5>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" className='dropdownbtn-backup'>
                                    Daily
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Daily</Dropdown.Item>
                                    <Dropdown.Item>Weekly</Dropdown.Item>
                                    <Dropdown.Item>Monthly</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className=' btn-backup-save mt-3'>SAVE</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-md-9'>
                    <BackupTableList />
                </div>
            </div>
        </>
    )
}

export default BackUpComponent