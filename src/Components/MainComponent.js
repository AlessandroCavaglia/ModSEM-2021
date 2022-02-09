import '../App.css';
import React, { Component } from 'react';
import $ from 'jquery';
import constants from "./constants";

export default class MainComponent extends Component{
    constructor(props) {
        super(props);
        this.loadData();
        this.state={wines:[]}
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
                let wineRow="🍷 "+wine.name+" "+wine.tag+" +   ";
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

    loadData(){ //Function used to load all wines at the start of the application
        //Query used to get all the wines
        $.ajax({
            url: constants.serverIp,
            type: "get",
            dataType: "text",
            data: {
            query:`PREFIX : <http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#> 
                    SELECT ?vino ?nomeVino ?GradazioneAlcolica ?Riconoscimenti ?tipoVino ?colore
                        WHERE { 
                            ?vino rdf:type ?tipoVino;
                            :nomeVino ?nomeVino;
                            :gradazioneAlcolica ?GradazioneAlcolica;
                            :riconoscimenti ?Riconoscimenti;
                            :colore ?colore.
                            ?tipoVino rdfs:subClassOf :Vino
                        }`
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
                        actual_wine.name=wines[i][1];
                        actual_wine.alchol=wines[i][2];
                        actual_wine.tag=wines[i][3];
                        actual_wine.type=[wines[i][4]];
                        actual_wine.color=wines[i][5];
                    }else{
                        actual_wine.type.push(wines[i][4])
                    }
                }
                wines_result.shift();
                console.log(wines_result)
                this.setState({wines:wines_result}) //Set the application state to all the wines
            },
            'error' : function(request,error)
            {
                console.log("Request: "+JSON.stringify(request));
            }
        });
    }
}
