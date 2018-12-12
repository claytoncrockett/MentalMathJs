import React from "react";

class Game extends React.Component {
  state = { vx: 2, vy: 3 };

  collisionCheck = (el, bounding) => {
    const { vx, vy } = this.state;
    if (el.offsetLeft <= 0 && vx < 0) {
      this.setState({ vx: -1 * vx });
    }
    if (el.offsetLeft + el.offsetWidth >= bounding.offsetWidth) {
      this.setState({ vx: -1 * vx });
    }
    if (el.offsetTop <= 0 && vy < 0) {
      this.setState({ vy: -1 * vy });
    }
    if (el.offsetTop + el.offsetHeight >= bounding.offsetHeight) {
      this.setState({ vy: -1 * vy });
    }
  };

  mover = (el, bounding) => {
    this.collisionCheck(el, bounding);
    el.style.left = el.offsetLeft + this.state.vx + "px";
    el.style.top = el.offsetTop + this.state.vy + "px";
    setTimeout(() => {
      this.mover(el, bounding);
    }, 10);
  };

  makeNewItem = () => {};

  componentDidMount() {
    const bouncer = document.getElementById("movingItem");
    const windowContainer = document.getElementById("game");
    setTimeout(() => {
      this.mover(bouncer, windowContainer);
    }, 10);
  }

  render() {
    return (
      <div id="game">
        <div id="movingItem">
          <h1>Game</h1>
        </div>
      </div>
    );
  }
}

export default Game;
