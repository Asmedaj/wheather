import React, {Component} from "react";

class CityTab extends Component {
    render() {
        return (
            <li className={this.props.active ? "active" : ""}>
                <button className="btn-city"
                        onClick={this.props.showCity.bind(null, this.props.id)} 
                >{this.props.name}</button>
                <button className="btn-del-city"
                        onClick={this.props.deleteCity.bind(null, this.props.id)}
                > X </button>
            </li>
        );
    }
}

export default CityTab;