import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    }
  }

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    })
  }

  step = () => {
    const { time, status } = this.state;

    this.setState({ time: this.state.time - 1 })

    if (time <= 0) {
      this.playBell();

      if (status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
          })
      } else if (status === 'rest') {
          this.setState({
            status: 'work',
            time: 1200,
          })
      }
    }
  };

  formatTime = () => {
    const { time } = this.state;
    const timer = new Date(time * 1000).toISOString().substr(14, 5);

    return timer;
  }

  stopTimer = () => {
    const { timer } = this.state;
    clearInterval(timer);

    this.setState({
      status: 'off',
      time: 0,
      })
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav')
    bell.play();
  }

  closeApp = () => {
    window.close();
  }

  render() {
    const { status } = this.state

    const description =
      <div>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>;

    const timer =
      <div className="timer">
        {this.formatTime()}
      </div>;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' ? description : null}
        {status === 'work' ? <img src="./images/work.png" /> : null}
        {status === 'rest' ? <img src="./images/rest.png" /> : null}
        {status != 'off' ? timer : null}
        {status === 'off' ? <button className="btn" onClick={this.startTimer}>Start</button> : null}
        {status != 'off' ? <button className="btn" onClick={this.stopTimer}>Stop</button> : null}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
