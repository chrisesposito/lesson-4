import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

        const Header = (props) => {
    return (
            <header>
                <h1>
                    <span className='car-word'>Pauline's</span>
                    <span className='cdr-word'>Perfect Patisserie</span>
                </h1>
                <div >
                    <Link to='/' >Pastry List</Link>
                    <br/>
                    <Link to='/order' >Your Order</Link>
                </div>
            </header>
            )
}

export default Header
