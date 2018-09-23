import React from 'react'
import '../styles/SearchDest.css';

class SearchDest extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="SearchDiv">
                <h1>Welcome to the student 
                    Flat Swap service</h1>
                <div className = "SearchBar">
                <form>
                    <input>
                    </input>
                    <input>
                    </input>
                    <button>
                        Search
                    </button>
                    </form>
                </div>

            </div>
        )
    }
}

export default SearchDest