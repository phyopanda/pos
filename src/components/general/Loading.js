import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

export const LoadingComponent = () => {
    
    return(
        <div className="loading">
            <Spinner animation="border" />
        </div>
    )
}