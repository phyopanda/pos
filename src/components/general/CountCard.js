import React from 'react'
import { div, Card } from 'react-bootstrap'
import { FaArrowCircleRight } from "react-icons/fa";

export const CountCard = ({ props, count, label, url, urlLabel, color }) => {
    const { history } = props;

    return (
        <Card style={{ backgroundColor: color }}>
            <Card.Body>
                <div className='d-md-flex flex-md-row justify-content-start align-items-start'>
                    <div className='col-md mb-1'>
                        <h1 className='mb-1 text-white'> {count} </h1>
                        <span className='mb-1 text-white'> {label} </span>
                    </div>
                </div>
            </Card.Body>


            { url && (
                <Card.Footer>
                <div className='d-md-flex flex-md-row justify-content-center align-items-center'>
                    <div onClick={() => history.push(url)}>
                        <span className='countcardbtn text-white'> { urlLabel } </span>
                        <FaArrowCircleRight 
                            className='ms-1'
                            size={20}
                            color={'white'} 
                            cursor={'pointer'}/>
                    </div>
                </div>
            </Card.Footer>
            )}
        </Card>
    )
}
