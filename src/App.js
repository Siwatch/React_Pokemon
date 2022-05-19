import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "eevee",
      pokemon: "",
      error: "",
    };
  }

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon = async () => {
    try {
      const response = await fetch(
        ` https://pokeapi.co/api/v2/pokemon/${this.state.query.toLowerCase()}`
      );
      const data = await response.json();

      console.log(data);
      //update state object
      this.setState({
        pokemon: data,
        error: null,
      });
    } catch (error) {
      this.setState({
        pokemon: null,
        error,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPokemon();
  };
  render() {

    console.log(this.state.query);

    const { query,pokemon,error } = this.state;
  
    return (
      <div>
        <div className="main-div">
          <form onSubmit={this.handleSubmit}>
            <h3>Search Pokemon</h3>
            <input
              type="text"
              value={query}
              onChange={this.handleChange}
            />
            <input type="submit" value="Search" />
          </form>

          {this.state.pokemon && !this.state.error ? (
            <div className="pokemon-pic">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt=""
              />
              <h2 className="pokemon-name-title">{this.state.pokemon.name}</h2>
              <h4>Weight : {pokemon.weight}</h4>
              <ul>
                {pokemon.abilities.map((abilityParam) => (
                  <li>{abilityParam.ability.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="error">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nuvola_apps_error.svg/1024px-Nuvola_apps_error.svg.png"
                alt="{error}"
              />
              <h2> Whoops! Coundn't Find That Pokemon </h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
