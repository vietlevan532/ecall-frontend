import React from 'react'
import './Customer.css'

function Customer() {
    return (
        <div className="customer">
            <div className="customer__title">
                <span>KHÁCH HÀNG</span>
            </div>
            <div className="customer__track">
                <img className="customer__logo" alt="" src="./Burger_King_Logo.png" />
                <img className="customer__logo" alt="" src="./samsung.jpeg" />
                <img className="customer__logo" alt="" src="./bvbachmai.png" />
                <img className="customer__logo" alt="" src="./highlandCoffe.png" />
                <img className="customer__logo" alt="" src="./bobapop.jpg" />
                <img className="customer__logo" alt="" src="./Emart-logo.jpg" />
                <img className="customer__logo" alt="" src="./bvhoanmi.png" />
            </div>
        </div>
    )
}

export default Customer
