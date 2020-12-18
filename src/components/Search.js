import React from 'react'

// const Search = (props) => {
class Search extends React.Component {
  state = {
    searchbarInput: ""
  }

  handleChange = (event) => {
    this.setState({
      searchbarInput: event.target.value
    })
  }

  render() {
    return (
      <div className="ui search">
        <div className="ui icon input">
          <input className="prompt" value={this.state.searchbarInput} onChange={(event) => {
            this.handleChange(event)
            this.props.handleSearch(event)
            
            }}/>
          <i className="search icon" />
        </div>
      </div>
    )
  }
}

export default Search
