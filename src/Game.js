import React from "react";
import Problem from "./Problem";

class Game extends React.Component {
  state = { answers: [], problems: [], playing: true, id: 0 };

  makeNewItem = () => {
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    let ans = x + y;
    const id = this.state.id;

    this.setState({
      answers: [...this.state.answers, ans],
      problems: [...this.state.problems, [x, y, id]],
      id: this.state.id + 1
    });

    if (this.state.answers.length < 5) {
      setTimeout(() => {
        this.makeNewItem();
      }, 10000);
    }
  };

  componentDidMount() {
    this.makeNewItem();
  }

  render() {
    const { answers, problems } = this.state;
    return (
      <div id="game">
        {this.state.playing &&
          problems.map(problem => {
            return (
              <Problem
                key={problem[2]}
                numberOne={problem[0]}
                numberTwo={problem[1]}
              />
            );
          })}
      </div>
    );
  }
}

export default Game;
