import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { properties: [] }
    }

    async componentDidMount() {
        let response = await axios.get('http://localhost:8080/properties');
        this.setState({ properties: response.data });
    };

    render() {
        const { properties } = this.state;
        return (
            <div>
                <h1>Real Estate Properties</h1>
                <button><Link to={`/properties/create`}>Create new property</Link></button>
                 <ul>
                    {properties.map((p, i) => (
                        <li key={i}><Link to={`/properties/${p._id}`}>{p.location}</Link></li>
                    ))}
                </ul> 
            </div>
        );
    }
};

export default List;