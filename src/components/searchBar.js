import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoIosTrash} from 'react-icons/io';
const MovieResults=(props)=>{
    const movies = props;
    const results = movies.props.map((mr) =>
    
        <Row className='row rounded container justify-content-center border border-warning offset-3 mt-4 mr-4' key={mr.imdbID}>
            <Col className='col-5'><img  fluid className='w-50'src={mr.Poster} alt={mr.Poster}/></Col>
            <Col className='col-4 my-4 py-5'><Button className='btn-danger btn-block 'onClick={() => props.removeItem(mr.imdbID)}><IoIosTrash></IoIosTrash></Button>
            <h5 className='text-light'>{mr.Title}<p>({mr.Year})</p></h5>
            
            </Col>
            
        </Row>


    );
    return(
        <div>{results}</div>
    )
}
class searchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue:'',
            searchResults:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress(this);
        
    }

    handleChange=(event)=>{
        var searchTerm='';
        for (var chr in event.target.value){
            if(event.target.value[chr] === ' '){
                searchTerm+='+'; 
             }else{
            searchTerm+=event.target.value[chr];
            }  
        }
        
        this.setState({searchValue: searchTerm});
        

    }

    removeItem(id){
        this.setState((state)=> ({
            ...state,
            searchResults: this.state.searchResults.filter((mr )=> mr.imdbID !== id) 
        }))
    }
    handleKeyPress=(event)=>{
        
        if (event.key ==='Enter'){
            event.preventDefault();
            this.handleSubmit();
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        var search = this.state.searchValue;
        axios.get('https://www.omdbapi.com/?apikey=1c223fba&s='+search)
        .then(response => { 
          var data=  _.uniqBy(response.data.Search, 'imdbID' );            
            this.setState({searchResults:data},console.log('done'));
        })
        .catch(err=> console.log(err))
        .then(console.log('done'));   
    }

    
    render(){

        return<div className='pl-3 bg-dark'>
            <Row className='justify-content-center col-md-12 pt-3 bg-dark'>
                <input className="col-md-4 input-group-text input-group-lg mr-4" type="text" placeholder='search for movies...' onChange={this.handleChange} />
                <Button className='btn btn-size btn-outline-warning btn-transparent' 
                onClick={this.handleSubmit}>Search</Button>
            </Row>
            <div>
                <MovieResults props={this.state.searchResults} removeItem={this.removeItem.bind(this)}/>
            </div>
            
        </div>
    }

}

export default searchBar;