import React, {Component} from "react";

class CityView extends Component {
    constructor (props) {
        super(props);
    }
    render() {
        let weather;
        if(this.props.data.length != 0) {
            let imgSrc = "http://openweathermap.org/img/w/"+ this.props.data[0].weather[0].icon +".png"
            let sunrise = new Date(this.props.data[0].sys.sunrise*1000);
            let sunset = new Date(this.props.data[0].sys.sunset*1000);
            let dt = new Date(this.props.data[0].dt*1000);
            weather = (
                <div className="city-view">
                    <div className="temperature">{this.props.data[0].main.temp} &deg;</div>
                    <img src={imgSrc} alt=""/>
                    <div className="weather">{this.props.data[0].weather[0].main} 
                        <span>({this.props.data[0].weather[0].description})</span>
                         </div>    
                    <div className="wind">Wind: {this.props.data[0].wind.speed} m/s</div>
                    <div className="humidity">Humidity: {this.props.data[0].main.humidity}%</div>     
                    <div className="clouds">Cloudiness: {this.props.data[0].clouds.all}%</div>
                    <h1>{this.props.data[0].name}, {this.props.data[0].sys.country}</h1>
                    <div className="sunrise">Sunrise: {sunrise.getHours() + ":" + sunrise.getMinutes() } </div>
                    <div className="sunset">Sunset: {sunset.getHours() + ":" + sunset.getMinutes()} </div>
                    <div className="pressure">Pressure: {this.props.data[0].main.pressure} hPa</div>
                </div>
            );
        }
        else {
            weather = (
            <div className="city-view">
            <h1 className="no-city">No city choosen</h1>
            </div>);
        }
        return(
            <div>
                {weather}
            </div>
        );
    }
}

export default CityView;