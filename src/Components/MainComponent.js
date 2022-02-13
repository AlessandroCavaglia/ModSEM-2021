import '../App.css';
import React, { Component } from 'react';
import $ from 'jquery';
import constants from "./constants";

export default class MainComponent extends Component{
    constructor(props) {
        super(props);
        this.state={wines:[],red:false,white:false,rose:false,ape:false,firstD:false,second:false,sweet:false}
        this.loadData(false,false,false,false,false,false,false);
    }

    updateRedWine= event => {
        if(this.state.red) {
            this.setState({red: false});
            this.loadData(false,this.state.white,this.state.rose,this.state.ape,this.state.firstD,this.state.second,this.state.sweet);
        }
        else{
            this.setState({red:true});
            this.loadData(true,this.state.white,this.state.rose,this.state.ape,this.state.firstD,this.state.second,this.state.sweet);
        }
    }

    updateWhiteWIne= event => {
        if(this.state.white) {
            this.setState({white: false});
            this.loadData(this.state.red,false,this.state.rose,this.state.ape,this.state.firstD,this.state.second,this.state.sweet);
        }
        else{
            this.setState({white:true});
            this.loadData(this.state.red,true,this.state.rose,this.state.ape,this.state.firstD,this.state.second,this.state.sweet);
        }
    }

    updateRoseWIne= event => {
        if(this.state.rose) {
            this.setState({rose: false});
            this.loadData(this.state.red,this.state.white,false,this.state.ape,this.state.firstD,this.state.second,this.state.sweet);
        }
        else{
            this.setState({rose:true});
            this.loadData(this.state.red,this.state.white,true,this.state.ape,this.state.firstD,this.state.second,this.state.sweet);
        }
    }

    updateApe= event => {
        if(this.state.ape) {
            this.setState({ape: false});
            this.loadData(this.state.red,this.state.white,this.state.rose,false,this.state.firstD,this.state.second,this.state.sweet);
        }
        else{
            this.setState({ape:true});
            this.loadData(this.state.red,this.state.white,this.state.rose,true,this.state.firstD,this.state.second,this.state.sweet);
        }
    }

    updateFirst= event => {
        if(this.state.firstD) {
            this.setState({firstD: false});
            this.loadData(this.state.red,this.state.white,this.state.rose,this.state.ape,false,this.state.second,this.state.sweet);
        }
        else{
            this.setState({firstD:true});
            this.loadData(this.state.red,this.state.white,this.state.rose,this.state.ape,true,this.state.second,this.state.sweet);
        }
    }

    updateSecond= event => {
        if(this.state.second) {
            this.setState({second: false});
            this.loadData(this.state.red,this.state.white,this.state.rose,this.state.ape,this.state.firstD,false,this.state.sweet);
        }
        else{
            this.setState({second:true});
            this.loadData(this.state.red,this.state.white,this.state.rose,this.state.ape,this.state.firstD,true,this.state.sweet);
        }
    }

    updateSweet= event => {
        if(this.state.sweet) {
            this.setState({sweet: false});
            this.loadData(this.state.red,this.state.white,this.state.rose,this.state.ape,this.state.firstD,this.state.second,false);
        }
        else{
            this.setState({sweet:true});
            this.loadData(this.state.red,this.state.white,this.state.rose,this.state.ape,this.state.firstD,this.state.second,true);
        }
    }

    render() {
        return(
            <div>
                <div className="firstRow">
                   <h1>Modellazione concettuale progetto Asti Wine</h1>
                </div>
                <div className="contentRow">
                    <div className="wines">
                        <h2 className="viniTitolo">Vini</h2>
                        {this.drawWines()}
                    </div>
                    <div className="filters">
                        <h2 className="viniTitolo">Filtri</h2>
                        <div className="filterRow">
                            <input className="filterCheck" type="checkbox" onChange={this.updateRedWine}/>
                            <p>Vino Rosso</p>
                        </div>
                        <div className="filterRow">
                            <input className="filterCheck" type="checkbox" onChange={this.updateWhiteWIne}/>
                            <p>Vino Bianco</p>
                        </div>
                        <div className="filterRow">
                            <input className="filterCheck" type="checkbox" onChange={this.updateRoseWIne}/>
                            <p>Vino Rosè</p>
                        </div>
                        <div className="filterRowNew">
                            <input  className="filterCheck" type="checkbox" onChange={this.updateApe}/>
                            <p>Vino Da Aperitivo</p>
                        </div>
                        <div className="filterRow">
                            <input className="filterCheck" type="checkbox" onChange={this.updateFirst}/>
                            <p>Vino Da Primo</p>
                        </div>
                        <div className="filterRow">
                            <input className="filterCheck" type="checkbox" onChange={this.updateSecond}/>
                            <p>Vino Da Secondo</p>
                        </div>
                        <div className="filterRow">
                            <input className="filterCheck" type="checkbox" onChange={this.updateSweet}/>
                            <p>Vino Da dolce</p>
                        </div>
                    </div>
                </div>
                <div className="contentRow">
                    <div className="legenda">
                        <h2 className="legendaTitle">Legenda</h2>
                        <p className="legendaItem">🟥 = Vino Rosso</p>
                        <p className="legendaItem">🟨 = Vino Bianco</p>
                        <p className="legendaItem">🌹 = Vino Rosè</p>
                        <p className="legendaItem">⚠️ = Vino Forte</p>
                    </div>
                </div>
            </div>
        )
    }

    //Function used to draw the wines list
    drawWines(){
        if(this.state.wines.length>0)
            return this.state.wines.map((wine)=>{
                let wineRow="🍷 "+wine.name;
                if(wine.type.includes("http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#VinoRosso")){
                    wineRow+=" 🟥";
                }
                if(wine.type.includes("http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#VinoBianco")){
                    wineRow+=" 🟨";
                }
                if(wine.type.includes("http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#VinoRosè")){
                    wineRow+=" 🌹";
                }
                if(wine.alchol>7){
                    wineRow+=" ⚠️";
                }

                return <p key={wine.id} className="wineRow">{wineRow}</p>
            })
        else
            return <p className="error">Ci dispiace non ci sono vini per i criteri selezionati</p>
    }

    loadData(red,white,rose,ape,firstD,second,sweet){ //Function used to load all wines at the start of the application
        //Query used to get all the wines
        let query;
        if(white===false && red===false && rose===false && ape===false && firstD===false && second===false && sweet===false){
            query=`PREFIX : <http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#>
                    SELECT *
                    WHERE { 
                        ?vino rdf:type ?tipoVino;
                        :nomeVino ?nomeVino;
                        :gradazioneAlcolica ?GradazioneAlcolica;
                        :haColore ?colore;
                        :staBeneCon ?cibo.
                        ?cibo rdf:type ?tipoCibo.
                        ?tipoVino rdfs:subClassOf :Vino.
                    }`;
        }else{
            query=`PREFIX : <http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#>
                    SELECT *
                    WHERE { 
                        ?vino rdf:type ?tipoVino;
                        :nomeVino ?nomeVino;
                        :gradazioneAlcolica ?GradazioneAlcolica;
                        :haColore ?colore;
                        :staBeneCon ?cibo.
                        ?cibo rdf:type ?tipoCibo.`
            if(white!==false || red!==false || rose !==false){
                let first=true;
                query+=`FILTER(?tipoVino in (`
                if(white){
                    if(first){
                        query+=`:VinoBianco`;
                        first=false;
                    }else
                        query+=`, :VinoBianco`
                }
                if(red){
                    if(first){
                        query+=`:VinoRosso`;
                        first=false;
                    }else
                        query+=`, :VinoRosso`
                }
                if(rose){
                    if(first){
                        query+=`:VinoRosè`;
                        first=false;
                    }else
                        query+=`, :VinoRosè`
                }
                query+=`))`;
            }
            if(ape!==false || firstD!==false || second !== false || sweet!==false){
                let first=true;
                query+=`FILTER(?tipoCibo in (`
                if(ape){
                    if(first){
                        query+=`:Aperitivo`;
                        first=false;
                    }else
                        query+=`, :Aperitivo`
                }
                if(firstD){
                    if(first){
                        query+=`:PrimoPiatto`;
                        first=false;
                    }else
                        query+=`, :PrimoPiatto`
                }
                if(second){
                    if(first){
                        query+=`:SecondoPiatto, :Carne, :Pesce, :Contorno`;
                        first=false;
                    }else
                        query+=`, :SecondoPiatto, :Carne, :Pesce, :Contorno`
                }
                if(sweet){
                    if(first){
                        query+=`:PiattoDessert`;
                        first=false;
                    }else
                        query+=`, :PiattoDessert`
                }
                query+=`))`;
            }

            query+=`}`;
        }
        console.log(query)
        $.ajax({
            url: constants.serverIp,
            type: "get",
            dataType: "text",
            data: {
            query:query
        },
            'success' : (data)=> {
                //Parsing the result inside a class
                let wines=data.split('\n');
                for(let i=0;i<wines.length;i++){
                    wines[i]=wines[i].split(',');
                }
                let wines_result=[];
                let actual_wine={};
                for(let i=1;i<wines.length;i++){
                    if(actual_wine==={} || actual_wine.id!==wines[i][0]){
                        if(actual_wine!=={})
                            wines_result.push(actual_wine);
                        actual_wine={}
                        actual_wine.id=wines[i][0];
                        actual_wine.name=""+wines[i][2];
                        actual_wine.alchol=wines[i][3];
                        actual_wine.type=[wines[i][1]];
                    }else{
                        actual_wine.type.push(wines[i][1])
                    }
                }
                wines_result.shift();
                this.setState({wines:wines_result}) //Set the application state to all the wines
            },
            'error' : function(request,error)
            {
                console.log("Request: "+JSON.stringify(request));
            }
        });
    }
}
