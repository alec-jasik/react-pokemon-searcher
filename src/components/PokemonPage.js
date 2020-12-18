import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchbarInput: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        pokemon: data
      })
    })
  }

  handleSearch = (event) => {
    if (event.target.value === "") {
      fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          pokemon: data
        })
      })
    } else {
      this.setState({
        pokemon: this.state.pokemon.filter(p => p.name.includes(event.target.value))
      })
    }
  }

  handleFormSubmit = (event) => {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: event.target.parentElement.parentElement[0].value,
        hp: event.target.parentElement.parentElement[1].value,
        sprites: {
          front: event.target.parentElement.parentElement[2].value,
          back: event.target.parentElement.parentElement[3].value
        }
      })
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        ...this.state,
        pokemon: [...this.state.pokemon, data]
      })
    })
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleFormSubmit={this.handleFormSubmit}/>
        <br />
        <Search handleSearch={this.handleSearch} pokemon={this.state.pokemon} searchbarInput={this.state.searchbarInput}/>
        <br />
        <PokemonCollection pokemon={this.state.pokemon}/>
      </Container>
    )
  }
}

export default PokemonPage
