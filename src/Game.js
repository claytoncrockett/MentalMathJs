import React from "react";
import Problem from "./Problem";

class Game extends React.Component {
  state = {
    answers: [],
    problems: [],
    playing: true,
    id: 0,
    userAnswer: "",
    score: 0,
    speed: 5000
  };

  makeNewItem = () => {
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    let ans = x + y;
    const id = this.state.id;
    if (this.state.answers.length < 10) {
      this.setState({
        answers: [...this.state.answers, ans],
        problems: [...this.state.problems, [x, y, id]],
        id: this.state.id + 1,
        speed: this.state.speed * 0.95
      });
    }

    setTimeout(() => {
      this.makeNewItem();
    }, this.state.speed);
  };

  checkForAnswer = answerCheck => {
    const arr = this.state.answers;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === answerCheck) {
        this.setState({ score: this.state.score + 1 });
      }
    }
  };

  handleSubmit = () => {
    let answerCheck = parseInt(this.state.userAnswer, 10);
    this.checkForAnswer(answerCheck);
    let newAnswers = this.state.answers.filter(
      answer => answer !== answerCheck
    );
    let newProblems = this.state.problems.filter(
      problem => answerCheck !== problem[0] + problem[1]
    );
    this.setState({
      answers: newAnswers,
      problems: newProblems,
      userAnswer: ""
    });
  };

  handleKey = event => {
    if (!isNaN(event.key)) {
      if (this.state.userAnswer.length > 1) {
        this.setState({ userAnswer: event.key });
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
    } else if (event.key === "Enter") {
      this.handleSubmit();
    }
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
        <div id="score">Score: {this.state.score}</div>
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
