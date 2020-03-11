import React from 'react'

export default function (props) {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ "zIndex": "9999", "top": "0", "position": "fixed", "width": "100vw", "height": "100vh", "backgroundColor": "#00000010" }}>
            <img src={require('asset/images/preloader3.gif')} alt="Loading..." />
        </div>
    )
}