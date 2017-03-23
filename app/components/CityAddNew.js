import React, {Component} from "react";

class CityAddNew extends Component {
    constructor(props) {
        super(props);
        this.state = {value:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        
    }
    handleEnter(event) {
        if(event.key === "Enter") {
            if(this.state.value == "")
                return;
            this.props.addCity(this.state.value);
            this.setState({value:"", city:""})    
        }
    } 
    render() {
        return(
            <div className="city-add-block">
                <input type="text"
                className="city-name"
                placeholder="Type city name"
                onChange={this.handleChange}
                value={this.state.value}
                onKeyUp = {this.handleEnter}
                />
                <button className="btn-add-city" 
                        onClick={()=> {
                            if(this.state.value == "")
                            return;
                            this.props.addCity(this.state.value);
                            this.setState({value:"", city:""})
                        }}
                >Add city</button>
            </div>
        );
    }
}

export default CityAddNew;