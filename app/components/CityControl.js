import React, {Component} from "react";
import CityTabsList from "./CityTabsList";
import CityAddNew from "./CityAddNew";

class CityControl extends Component {
    render() {
        return (
            <div className="city-control">
                <CityAddNew addCity={this.props.addCity}/>
                <CityTabsList data={this.props.data} 
                              deleteCity={this.props.deleteCity}
                              showCity={this.props.showCity} />
            </div>
        );
    }
}

export default CityControl;