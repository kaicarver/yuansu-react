import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function PeriodicTable(props) {
  return <div>
    <h1>
    Periodic Table (placeholder)
    </h1>
    <Element/>
    <Element/>
    <Element/>
  </div>;
}
function Element(props) {
  return <div>
    An element
  </div>;
}


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: 'Stay at home' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Kai's React App"
  }

  render() {
    return (
      <div>
        <h3>TODO List</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <br />
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <TodoList items={this.state.items} />
        Source: <a
          className="App-link"
          href="https://github.com/kaicarver/yuansu-react"
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ['Something else', 'Go to bed', 'Have a drink'][Math.floor(Math.random() * 3)],
    }));
  }
}

class TodoList extends React.Component {
  handleClick(item) {
    alert('heyy ' + item.id)
  }
  render() {
    return (
      <ul>
        {this.props.items.map((item, i) => (
          <TodoItem onClick={(i) => this.handleClick(i)} />
        ))}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
  render() {
    let count = this.props.count;
    let item = this.props.items[count];
    return (
      <li onClick={() => this.onClick(item)} key={item.id}><span>{count}.</span> {item.text}</li>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <PeriodicTable />
    <TodoApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
