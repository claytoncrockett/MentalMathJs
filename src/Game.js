import React from "react";
import Problem from "./Problem";

class Game extends React.Component {
  state = { answers: [], problems: [] };

  makeNewItem = () => {
    let x = Math.floor(Math.random(1, 10));
    let y = Math.floor(Math.random(1, 10));
    let ans = x + y;
    this.setState({
      answers: [...this.state.answers, ans],
      problems: [...this.state.problems, [x, y]]
    });

    setTimeout(() => {
      this.makeNewItem();
    }, 5000);
  };

  componentDidMount() {
    this.makeNewItem();
  }

  render() {
    const { answers } = this.state;
    return (
      <div id="game">
        {answers.map(problem => {
          return (
            <Problem key={1} numberOne={problem[0]} numberTwo={problem[1]} />
          );
        })}
      </div>
    );
  }
}

export default Game;
