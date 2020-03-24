import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to yet another of Kai's web projects.
        </p>
        <HelloMessage name="Kai" />
        <p>
        Source: <a
          className="App-link"
          href="https://github.com/kaicarver/yuansu-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>. <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </p>
      </header>
    </div>
  );
}

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

export default App;
