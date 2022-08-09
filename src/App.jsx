import "./App.css";
import axios from "axios";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.getPokemonData(this.state.value);
    event.preventDefault();
  }

  getPokemonData(pokemonName) {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
      .then((response) => {
        console.log(response);
        this.setState({ pokemon: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getPokemonPhoto() {
    axios
      .get(
        "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/" +
          {} +
          ".svg"
      )
      .then((response) => {
        console.log(response);
        this.setState({ pokemon: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { pokemon } = this.state;
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Pokemon App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              ></Nav>
              <Form className="d-flex" onSubmit={this.handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <Button onClick={this.handleSubmit} variant="outline-success">
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container">
          <div className="md-2"></div>
          <div className="md-8">
            {pokemon && pokemon.name !== "undefined" ? (
              <PokemonCard pokemon={pokemon ? pokemon : null} />
            ) : (
              <span>Please search a Pokemon Name</span>
            )}
          </div>
          <div className="md-2"></div>
        </div>
      </>
    );
  }
}

function PokemonCard(data) {
  console.log(data.pokemon);
  let imageUrl =
    "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/" +
    data.pokemon.id +
    ".svg";
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Card>
              <Card.Img src={imageUrl} />
              <Card.Body>
                <Card.Title>{data.pokemon.name}</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-8">
            <Table striped bordered hover size="sm">
              <tbody>
                {data.pokemon.stats.length
                  ? data.pokemon.stats.map((stat) => (
                      <tr>
                        <td>{stat.stat.name} </td>
                        <td>{stat.base_stat} </td>
                      </tr>
                    ))
                  : "none"}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Abilities</td>
                <td>
                  {data.pokemon.abilities.length
                    ? data.pokemon.abilities.map((ability) => (
                        <span>{ability.ability.name}, </span>
                      ))
                    : "none"}
                </td>
              </tr>
              <tr>
                <td>Forms</td>
                <td>
                  {data.pokemon.forms.length
                    ? data.pokemon.forms.map((form) => (
                        <span>{form.name}, </span>
                      ))
                    : "none"}
                </td>
              </tr>
              <tr>
                <td>Moves</td>
                <td>
                  {data.pokemon.moves.length
                    ? data.pokemon.moves.map((move) => (
                        <span>{move.move.name}, </span>
                      ))
                    : "none"}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
