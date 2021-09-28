import React, { Component } from "react";
import "./Deck.css";
import axios from "axios";
import Card from "./Card";
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: [],
    };
  }
  async componentDidMount() {
    let response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: response.data });
  }

  handleClick = async () => {
    let deck_id = this.state.deck.deck_id;

    try {
      let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardResponse = await axios.get(cardUrl);
      if (!cardResponse.data.success) {
        throw new Error("No card Remaining!!");
      }
      let card = cardResponse.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  };

  render() {
    let cards = this.state.drawn.map((card) => (
      <Card key={card.id} name={card.name} image={card.image} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">💎Crad Dealer💎</h1>
        <h2 className="Deck-title subtitle">💎A simple React project💎</h2>
        <button onClick={this.handleClick} className="Deck-btn">
          Pick a card
        </button>
        <div className="deck-card">{cards}</div>
      </div>
    );
  }
}

export default Deck;
