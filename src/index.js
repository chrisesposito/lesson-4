import React from 'react'
import ReactDOM from 'react-dom'
import {
BrowserRouter as Router,
        Route,
        hashHistory,
        Switch
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import NotFound from './components/NotFound'
import Order from './components/Order'

        function getTotalPrice(pastries, totalPrice = 0)
        {
            return pastries.reduce((acc, p) => {
                return acc + p.price
            }, totalPrice)
        }

class Root extends React.Component
{

    constructor()
    {
        super()
        this.state = {
            pastries,
            order: {
                items: [],
                price: 0
            }
        }
        this.addToOrder = this.addToOrder.bind(this)
        this.removeFromOrder = this.removeFromOrder.bind(this)
        this.clearOrder = this.clearOrder.bind(this)
        this.render = this.render.bind(this)
    } // end constructor

    addToOrder(e)
    {
        e.preventDefault()
        //console.log({target: event.target})
        const pastryName = e.target.querySelector('input').value
        console.log(" adding name: " + pastryName)

        const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
        const pastry = pastries.find(p => p.name === pastryName)
        const order = Object.assign({}, this.state.order) // get existing order
        const orderPastry = Object.assign({}, order[pastry.name])

        if (orderPastry.name)
        {
            // pastry already in order, so increment amount
            orderPastry.quantity++

            // add to order
            order[pastry.name] = orderPastry
            console.log("added another " + pastry.name + " to order")
        }
        else
        {
            // this pastry doesn't exist in order yet so add new pastry type to order
            order[pastry.name] = Object.assign({}, pastry, {quantity: 1})
            console.log("added first " + pastry.name + " to order")
        }


        this.setState({order}) // set state and re-render
    } // end addToOrder

    removeFromOrder(e)
    {
        e.preventDefault()

        const value = e.target.querySelector('input').value

        const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
        const pastry = pastries.find(p => p.name === value)
        if (!pastry)
            return

        const order = Object.assign({}, this.state.order)
        const orderPastry = Object.assign({}, order[pastry.name])

        if (orderPastry.quantity > 1)
        {
            // more than 1 in order, so adjust amount
            orderPastry.quantity--
            order[pastry.name] = orderPastry
        }
        else
        {
            // just 1 of these in order, so remove pastry
            delete order[pastry.name]
        }

        this.setState({order}) // set state and re-render
    }

    clearOrder(e)
    {
        e.preventDefault()

        const order = Object.assign({}, '')

        this.setState({
            order
        })
    }

    render()
    {
        return (
                <Router history={hashHistory}>
                    <App>
                        <Switch>

                        <Route exact path='/' render={(props) => (
                                        <PastryList pastries={this.state.pastries} />
                                            )}
                            />

                            <Route path='/order' render={(props) => (
                                        <Order order={this.state.order} removeFromOrder={this.removeFromOrder} clearOrder={this.clearOrder} />
                                                )}
                                />

                                <Route path='/:pastry' render={props =>
                                    {
                                        const pastryName = props.match.params.pastry
                                        const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
                                        const pastry = pastries.find(p => p.name === pastryName)
                                        if (pastry)
                                        {
                                                   return (<PastryPage pastry={pastry} addToOrder={this.addToOrder} />)
                                                   }
                                                   else
                                                   {
                                                return (<Route path='*' status={404} component={NotFound} />)
                                            }  // end if(pastry)
                                        }
                                    }
                                    />

                                    </Switch>
                                    </App>
                                    </Router>
                )
    } // end render
} // end class

ReactDOM.render(
        <Root />,
        document.getElementById('root')
        )
