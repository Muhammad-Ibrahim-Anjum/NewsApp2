import React, { Component } from 'react'
import spinner from '../img/spinner.gif' 

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={spinner} alt="loading" />
            </div>
        )
    }
}
