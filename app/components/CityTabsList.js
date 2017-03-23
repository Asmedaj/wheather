import React, {Component} from "react";
import CityTab from "./CityTab";

class CityTabsList extends Component {
    render() {
        let cityTabs  = this.props.data.map((data)=>{
            return <CityTab key={data.id}
                            id={data.id}
                            active={data.active}
                            name={data.name}
                            deleteCity={this.props.deleteCity}
                            showCity={this.props.showCity} 
                             />
        });
        return(
            <ul className="city-list">
                {cityTabs}
            </ul>
        );
    }
}

export default CityTabsList;