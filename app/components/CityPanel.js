import React, {Component} from "react";
import CityControl from "./CityControl"
import CityView from "./CityView";
import "whatwg-fetch";

class CityPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
        this.deleteCity = this.deleteCity.bind(this);
        this.addCity = this.addCity.bind(this);
        this.showCity = this.showCity.bind(this); 
    }
    // show city weather by click
    showCity(cityId){
        let temp = this.state.list;
        for (let i = 0, n = temp.length; i < n; i++) {
            if (temp[i].active == true) {
                temp[i].active = false;
            }
            if (temp[i].id == cityId) {
                temp[i].active = true;
                cityId = i;
            }
        }
        let tes = Date.now();
        if( tes - temp[cityId].dt*1000 > 10800000) {
            let self = this;
            fetch( "http://api.openweathermap.org/data/2.5/weather?q=" + temp[cityId].name + "&appid=c2a68af6c4176d348ac7e5701a6c83a8&units=metric") 
                .then(function(response){
                    return response.json();
                })
                .then(function(responseData) {
                    responseData.active = true;
                    temp[cityId] = responseData;
                    let data = JSON.stringify(temp);
                    localStorage.setItem("weatherData", data);
                    self.setState({list: temp});
            });
        }
        else {
            this.setState({list: temp});
        }
    }
    //delete city from list
    deleteCity(cityId){
        let temp = this.state.list;
        for (let i = 0, n = temp.length; i < n; i++) {
            if (temp[i].id == cityId) {
                temp.splice(i, 1);
                break;
            }
        }
        let data = JSON.stringify(temp);
        localStorage.setItem("weatherData", data);
        this.setState({list: temp});
    }
    //add city to list
    addCity(cityName) {
        let temp = this.state.list;
        for (let i = 0, n = temp.length; i < n; i++) {
            if (temp[i].active == true) {
                temp[i].active = false;
                break;
            }
        }
        let self = this;
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=c2a68af6c4176d348ac7e5701a6c83a8&units=metric")
        .then(function(response) {
            return response.json();
        })
        .then(function(responseData) {
            responseData.active = true;
            let flag = false;
            for (let i = 0, n = temp.length; i < n; i++) {
                if (temp[i].id == responseData.id) {
                    temp[i] = responseData;
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                temp.push(responseData);
            }
            let data = JSON.stringify(temp);
            localStorage.setItem("weatherData", data);
            self.setState({list: temp});    
        })
        .catch( alert );
    }
    // add 2 city by default on load or load city list from local storage
    componentWillMount(){
        let cityList = [];
        let self = this;
        fetch( "http://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=c2a68af6c4176d348ac7e5701a6c83a8&units=metric") 
            .then(function(response){
                return response.json();
            })
            .then(function(responseData) {
                    responseData.active = true;
                    cityList.push(responseData);
                    fetch( "http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=c2a68af6c4176d348ac7e5701a6c83a8&units=metric") 
                    .then(function(response1){
                        return response1.json();
                    })
                    .then(function(responseData1) {
                    responseData1.active = false;
                    cityList.push(responseData1);
                    let data = JSON.parse(localStorage.getItem("weatherData"));
                    if(data == null) {
                        data = JSON.stringify(self.state.list);
                        localStorage.setItem("weatherData", data);
                        self.setState({list: cityList});    
                    }
                    else {
                        data = localStorage.getItem("weatherData");
                        data = JSON.parse(data);
                        self.setState({list: data}); 
                    }
            });
            });
    }
    render() {
        return (
            <div className="widget">
            <CityView data={this.state.list.filter((data)=>{
                return data.active == true})}/>    
            <CityControl data={this.state.list} 
                         deleteCity={this.deleteCity} 
                         addCity={this.addCity}
                         showCity={this.showCity}
                         />
            </div>
        );
    }
}

export default CityPanel;