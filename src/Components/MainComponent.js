import '../App.css';
import React, { Component } from 'react';
import $ from 'jquery';

export default class MainComponent extends Component{
    render() {
        return(
            <div>
                <p onClick={()=>{this.loadData()}}>Cliccami</p>
            </div>
        )
    }

    loadData(){
        $.ajax({
            url: "http://DESKTOP-CFCG2C8:7200/repositories/test1",
            http:"//localhost:7200/repositories/",
            type: "get",
            dataType: "text",
            data: {
            query:`select * where { 
                    ?s ?p ?o .} limit 100`
        },
            'success' : function(data) {
                console.log(data);
            },
            'error' : function(request,error)
            {
                alert("Request: "+JSON.stringify(request));
            }
        });
    }
}
