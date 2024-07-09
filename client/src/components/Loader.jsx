import React from 'react'
import "./Loader.css"
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div className="loading-overlay">
            <Spinner animation="border" role="status" size="lg">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader
