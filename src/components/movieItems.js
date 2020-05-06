import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

class MovieItems extends React.Component{
    constructor(props){
        super(props);}
    render(){
        return (
            props.map((mr)=>
            <div>
                <h6>{mr.Title}</h6>

            </div>
            )

        )
    }
         
}

export default MovieItems;