import '../App.css';
import React, { Component } from 'react';
import $ from 'jquery';
import constants from "./constants";

export default class MainComponent extends Component{
    constructor(props) {
        super(props);
        this.state={wines:[],wineInfo:null,red:false,white:false,rose:false,ape:false,firstD:false,second:false,sweet:false}
        this.loadData(false,false,false,false,false,false,false);
    }

    render() {  //Function used to show HTML
        return(
            <div>
                <div className="firstRow">
                   <h1>Modellazione concettuale progetto Asti Wine</h1>
                </div>
                <div className="contentRow">
                    <div className="wines">
                        <h2 className="viniTitolo">Vini</h2>
                        {this.drawWines() /*We draw the list of wines*/}
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
                {this.drawWineInfo()/*If available we draw the selected wine*/}
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

                return <p key={wine.id} className="wineRow" onClick={()=>this.loadSingleWine(wine.id)}>{wineRow}</p>
            })
        else
            return <p className="error">Ci dispiace non ci sono vini per i criteri selezionati</p>
    }

    //Function used to draw the single wine information
    drawWineInfo(){
        if(this.state.wineInfo===null){
            return ""
        }else{
            return <div className="wineInfo">
                <h1 className="wineName">{this.state.wineInfo.name}</h1>
                <h3>Certificazione:{this.state.wineInfo.certificationDesc}</h3>
                <h3>Tasso alcolemico:{this.state.wineInfo.alchol}</h3>
                <h3>Prodotto da:{this.state.wineInfo.produttore}</h3>
                <h3>Colore: <span className="colourSpan" style={{backgroundColor: "#"+this.state.wineInfo.colour}}/></h3>
                <h2>Composizione</h2>
                {this.state.wineInfo.grapes.map((grape,id)=>{
                    return <h5 key={id}>{grape} Max:{this.state.wineInfo.grapesPercentageMax[id]}% Min:{this.state.wineInfo.grapesPercentageMin[id]}%</h5>
                })}
                <h2>Abbinamenti</h2>
                {this.state.wineInfo.foods.map((food,id)=>{
                    return <h5 key={"food"+id}>{food}</h5>
                })}

            </div>
        }
    }

    //Function used to load all wines at the start of the application and when a change is made to filters
    loadData(red,white,rose,ape,firstD,second,sweet){
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
                    }ORDER BY(?vino)`;
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

            query+=`}ORDER BY(?vino)`;
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
                console.log(wines);
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
    //Function used to load the informations of a single wine when it's selected
    loadSingleWine(id){
        this.setState({wineInfo:null})
        let query=`
                    PREFIX wd: <http://www.wikidata.org/entity/>
                    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                    PREFIX : <http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#>

                    SELECT *
                    WHERE {
                        <`+id+`> rdf:type ?tipoVino;
                        :nomeVino ?nomeVino;
                        :gradazioneAlcolica ?GradazioneAlcolica;
                        :haCertificazione ?certificazioneId;
                        :haColore ?coloreId;
                        :haComposizione ?ListaTipi;
                        :èProdotto ?Produttore;
                        :staBeneCon ?cibo.
                        ?cibo rdf:type ?tipoCibo.
                        ?tipoVino rdfs:subClassOf :Vino.
                        ?cibo :NomePiatto ?nomeCibo.
                        SERVICE <https://query.wikidata.org/sparql> {
                             ?certificazioneId rdfs:label ?CertificazioneDescription
                             FILTER (lang(?CertificazioneDescription) = "it")
                        }
                        SERVICE <https://query.wikidata.org/sparql> {
                              ?coloreId wdt:P465 ?ColoreCodice
                        }
                        ?ListaTipi  :haPercentualeUva ?percnetualeUva.
                        ?percnetualeUva :èRelativaA ?tipoUva;
                        :max ?maxPercentuale;
                        :min ?minPercentuale.
                        ?produttore foaf:name ?nomeProduttore.
                    }`
        console.log(query);
        $.ajax({
            url: constants.serverIp,
            type: "get",
            dataType: "text",
            data: {
                query:query
            },
            'success' : (data)=> {
                //Parsing the result inside a class
                let wineInfo=data.split('\n');
                for(let i=0;i<wineInfo.length;i++){
                    wineInfo[i]=wineInfo[i].split(',');
                }
                let wine={};
                for(let i=1;i<wineInfo.length;i++){
                    wineInfo[i][0]=wineInfo[i][0].replaceAll("http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#","");
                    if(wineInfo[i][12]!==undefined)
                        wineInfo[i][12]=wineInfo[i][12].replaceAll("http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#","");
                    if(wineInfo[i][13]!==undefined)
                        wineInfo[i][13]=wineInfo[i][13].replaceAll("http://www.semanticweb.org/ProgettoModSem2021/wine-ontology#","");
                    if(i===1){
                        wine.name=wineInfo[i][1];
                        wine.alchol=wineInfo[i][2];
                        wine.certificationDesc=wineInfo[i][10];
                        wine.colour=wineInfo[i][11];
                        wine.types=[wineInfo[i][0]];
                        wine.foods=[wineInfo[i][9]];
                        wine.grapes=[wineInfo[i][13]];
                        wine.grapesPercentageMax=[wineInfo[i][14]];
                        wine.grapesPercentageMin=[wineInfo[i][15]];
                        wine.produttore=wineInfo[i][17];

                    }else{
                        if(!wine.types.includes(wineInfo[i][0]) && wineInfo[i][0][0]!=='_' && wineInfo[i][0]!=="" && !wineInfo[i][0].includes("wikidata"))
                            wine.types.push(wineInfo[i][0]);
                        if(!wine.foods.includes(wineInfo[i][9]) && wineInfo[i][9]!==undefined)
                            wine.foods.push(wineInfo[i][9]);
                        if(!wine.grapes.includes(wineInfo[i][13]) && wineInfo[i][13]!==undefined){
                            wine.grapes.push(wineInfo[i][13]);
                            wine.grapesPercentageMax.push(wineInfo[i][14]);
                            wine.grapesPercentageMin.push(wineInfo[i][15]);
                        }

                    }
                }
                this.setState({wineInfo:wine});
                console.log(wine);
            },
            'error' : function(request,error)
            {
                console.log("Request: "+JSON.stringify(request));
            }
        });

    }

    //Functions used to manage the change in the checkboxes
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
}
