import React from 'react';
import QRCode from 'qrcode.react';
import BarCode from "react-barcode";
import { Card } from 'react-bootstrap';


export const ItemQRComponent = ({ item }) => {
    
    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row">
                        <span className='title'> Item Code </span>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='d-flex align-items-center justify-content-around'>
                    <div className='d-md-flex flex-md-row justify-content-start align-items-start'>
                        <QRCode 
                            className='me-3'
                            id={item.id}
                            value={`Model- ${item.model}, Name- ${item.eng_name}`} 
                            size={140}
                            includeMargin
                            level='Q'
                        />

                        {/* <div className='d-md-flex flex-md-column'>
                            <label> English Name - <span className="ms-3"> {item.eng_name} </span> </label>
                            <label> Myanamr Name - <span className="ms-3"> {item.mm_name} </span> </label>
                            <label> Material Code - <span className="ms-3"> {item.code} </span> </label>
                            <label> Model - <span className="ms-3"> {item.model} </span> </label>
                            <label> Category - <span className="ms-3"> {item.category ? item.category.name : '----'} </span> </label>
                            <label> Location - <span className="ms-3"> {item.location} </span> </label>
                        </div> */}
                    </div>
                
                    <div className='d-md-flex flex-md-row justify-content-start align-items-start'>
                        <BarCode
                            format={"CODE128"}
                            displayValue={true}
                            fontSize={16}
                            width={2}
                            height={50}
                            margin={10}
                            textMargin={2}
                            value={`${item.model} - ${item.eng_name}`} 
                        />

                        {/* <div className='d-md-flex flex-md-column ms-3'>
                            <label> English Name - <span className="ms-3"> {item.eng_name} </span> </label>
                            <label> Myanamr Name - <span className="ms-3"> {item.mm_name} </span> </label>
                            <label> Material Code - <span className="ms-3"> {item.code} </span> </label>
                            <label> Model - <span className="ms-3"> {item.model} </span> </label>
                            <label> Category - <span className="ms-3"> {item.category ? item.category.name : '----'} </span> </label>
                            <label> Location - <span className="ms-3"> {item.location} </span> </label>
                        </div> */}
                    </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}