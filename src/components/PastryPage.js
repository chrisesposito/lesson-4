import React from 'react'
import PropTypes from 'prop-types'
import AlertContainer from 'react-alert'
import './PastryPage.css'

        function formatPrice(priceInCents)
        {
            return `$${(priceInCents / 100).toFixed(2)}`
        }

class PastryPage extends React.Component
{

    constructor()
    {
        super()

        this.showAlert = this.showAlert.bind(this)
        this.render = this.render.bind(this)
    }

    alertOptions =
            {
                offset: 14,
                position: 'top left',
                theme: 'dark',
                time: 4000,
                transition: 'scale'
            }

    showAlert()
    {
        this.msg.show('Added to Basket!',
                {
                    time: 2000,
                    type: 'success'
                })
    }

    render()
    {
        const {pastry} = this.props
        console.log(" pastry name = " + pastry.name)
        return (
                <div className='pastry-page'>
                    <div className='pastry-container'>
                        <div className='pastry-img-container'>
                            <img src={pastry.image} alt={pastry.name} />
                        </div>
                        <div className='pastry-info'>
                            <h5 className='name'>{pastry.name}</h5>
                            <p className='description'>{pastry.description}</p>
                            <div className='price'>{formatPrice(pastry.price)}</div>
                        </div>
                    </div>
                    <form method='POST' action='/order' className='add-to-order' onSubmit={this.props.addToOrder}>
                        <input type='hidden' name = 'name' value={pastry.name}  />
                        <button type='submit' onClick={this.showAlert} >Add to Order</button>
                    </form>
                    <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                </div>
                )
    }
}

PastryPage.propTypes = {
    pastry: PropTypes.object.isRequired,
    addToOrder: PropTypes.func.isRequired
}

export default PastryPage
