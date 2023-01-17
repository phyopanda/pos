import React, { useCallback, useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { t } from 'i18next';
import { HistoryLog } from '../../components/general/Historylog';
import { EditNumberSpecificationForm } from '../../components/settings/editNumberSpecificationForm';
import { getNumberSpecList } from '../../services/numberSpecification.service';

const NumberSpecificationSettingPage = ({ props }) => {
    const [numLists, setNumLists] = useState([]);

    const fetchApi = useCallback( async () => {
        const response = await getNumberSpecList();
        if(response) {
            setNumLists(response);
        }
    },[]);

    useEffect(() => {
        fetchApi();
    },[fetchApi]);

    const getUpdateStatus = (e) => {
        if(e) { fetchApi(); }
    }

    return(
        <div className='row mt-3'>
            <div className='col-md-4'>
                <Card>
                    <Card.Header>
                        <Card.Title> {t('number-specification')} </Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered className='table-wrapper'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th> {t('number')} </th>
                                    <th> {t('character')} </th>
                                </tr>
                            </thead>

                            <tbody>
                                {numLists.map((numSpec, index) => {
                                    return(
                                        <tr key={`number_id_${index}`}>
                                            <td> {index + 1} </td>
                                            <td> {numSpec.set_number} </td>
                                            <td> {numSpec.set_char} </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

            <div className='col-md-4'>
                <EditNumberSpecificationForm props={props} dataSource={numLists} reload={(e) => getUpdateStatus(e)} />
            </div>

            <div className='col-md-4'>
                <HistoryLog props={props} title={t('number-specification-history-log')} />
            </div>
        </div>
    )
}
export default NumberSpecificationSettingPage;