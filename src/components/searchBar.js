import React from 'react';
import {Button, Col, Row, Badge} from 'react-bootstrap';
import axios from 'axios';
import '../App.css';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoIosTrash} from 'react-icons/io';
const MovieResults=(props)=>{
    const movies = props;
    const results = movies.props.map((mr) =>
    
        <Row className='row col-10 col-sm-6 offset-1 offset-sm-3 rounded container justify-content-center border border-warning mt-4' key={mr.imdbID}>
            <Col className='col-10 col-sm-6 py-4'><img className='text-light img-fluid w-75'src={mr.Poster} alt='Poster not available'/></Col>
            <Col className='col-10  col-sm-6 my-4 container'><h5 className='text-warning col-12'>{mr.Title}<h5 className='text-light'>({mr.Year})</h5></h5>
            <Button  fluid className='btn container btn-danger btn-block ml-3 my-1 w-75'onClick={() => props.removeItem(mr.imdbID)}><p className='font-weight-bold font-sz'>Remove<IoIosTrash size={26}></IoIosTrash></p></Button>
            
            
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

        return<div className='pl-3 bg-dark justify-content-center'>
            <Row className='justify-content-center col-md-12 pt-3 bg-dark'>
                <input className="col-6 input-group-text input-group-lg " type="text" placeholder='search for movies...' onChange={this.handleChange} />
                <Button type='submit'className='btn btn-size mx-3 btn-outline-warning btn-transparent' 
                onClick={this.handleSubmit}>Search</Button>
            </Row>
            <div className='col-12'>
                <MovieResults props={this.state.searchResults} removeItem={this.removeItem.bind(this)}/>
            </div>
            
        </div>
    }

}

export default searchBar;