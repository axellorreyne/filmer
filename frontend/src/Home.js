import {Component} from "react";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: "Loading..."
        }
    }

    getRandomMovie = () => {
        axios.get('/api/random_movie').then((res) => this.setState({movie: res.data}));
    }

    componentDidMount() {
        this.getRandomMovie();
    }

    render() {
        return (
            <div className="App">
                {this.state.movie.title}
                <br/>
                <button onClick={this.getRandomMovie}>new movie</button>
            </div>
        );
    }
}

export default App;
