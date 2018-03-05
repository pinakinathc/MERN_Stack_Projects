"use strict"
import React from 'react';
// import Menu from './components/menu';
// import Footer from './components/footer';

class Main extends React.Component{
    render(){
        console.log('=====HEllo=====',this.props.children);
        return(
            <div>
                {this.props.children} 
            </div>
        )
    }
}

export default Main;