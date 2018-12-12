import React from "react";

class Problem extends React.Component {
  state = { vx: 3, vy: 3 };

  myRef = React.createRef();

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

  start = el => {
    el.style.left = el.offsetLeft + Math.floor(Math.random() * 500) + "px";
    el.style.top = el.offsetTop + Math.floor(Math.random() * 400) + "px";
  };

  componentDidMount() {
    const bouncer = this.myRef.current;
    const windowContainer = document.getElementById("game");
    this.start(bouncer);
    setTimeout(() => {
      this.mover(bouncer, windowContainer);
    }, 10);
  }
  render() {
    return (
      <div class="movingItem" ref={this.myRef}>
        <h1>
          {this.props.numberOne} + {this.props.numberTwo}
        </h1>
      </div>
    );
  }
}

export default Problem;
