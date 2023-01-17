import React from "react";
import BarCode from "react-barcode";
import { Card } from "react-bootstrap";

export const ItemBarCodeComponent = ({ item }) => {

    return(
        <>
            <Card className="mt-3">
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row">
                        <span className="title"> BarCode </span>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
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

                        <div className='d-md-flex flex-md-column ms-3'>
                            <label> English Name - <span className="ms-3"> {item.eng_name} </span> </label>
                            <label> Myanamr Name - <span className="ms-3"> {item.mm_name} </span> </label>
                            <label> Material Code - <span className="ms-3"> {item.code} </span> </label>
                            <label> Model - <span className="ms-3"> {item.model} </span> </label>
                            <label> Category - <span className="ms-3"> {item.category ? item.category.name : '----'} </span> </label>
                            <label> Location - <span className="ms-3"> {item.location} </span> </label>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}