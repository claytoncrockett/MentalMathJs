import React from "react";
import Problem from "./Problem";

class Game extends React.Component {
  state = {
    answers: [],
    problems: [],
    playing: true,
    id: 0,
    userAnswer: "",
    score: 0
  };

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

  handleSubmit = () => {
    console.log("hi");
  };

  handleKey = event => {
    if (!isNaN(event.key)) {
      if (this.state.userAnswer.length > 1) {
        this.setState({ userAnswer: event.key });
      } else if (event.key === "Enter") {
        this.handleSubmit();
      } else {
        this.setState({ userAnswer: this.state.userAnswer + event.key });
      }
    } else if (event.key === "Backspace") {
      if (this.state.userAnswer.length > 0) {
        this.setState({
          userAnswer: this.state.userAnswer.substring(
            0,
            this.state.userAnswer.length - 1
          )
        });
      }
    }
    console.log(this.state.userAnswer);
  };

  componentDidMount() {
    this.makeNewItem();
    document.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
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
        <div id="answer">
          <h1 id="answertext">{this.state.userAnswer}</h1>
        </div>
      </div>
    );
  }
}

export default Game;
