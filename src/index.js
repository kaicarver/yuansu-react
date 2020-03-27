import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import periodicData from './PeriodicTable.json';

console.log(periodicData);

function PeriodicTable(props) {
  return <div>
    <h1>Periodic Table</h1>
    <div>
      {periodicData.elements.map((el) =>
        <span key={el.symbol}><Element name={el.symbol} /> </span>
      )}
    </div>
  </div>;
}

function Element(props) {
  return <span>
    {props.name}
  </span>;
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
    const todos = ['Something else', 'Go to bed', 'Have a drink', 'Github commit', 'Go shopping', 'Go jogging', 'Go crazy'];
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: todos[Math.floor(Math.random() * todos.length)],
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, i) => (
          <TodoItem count={i} items={this.props.items} />
        ))}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
  handleClick(items, count) {
    alert(`heyy item ${count + 1} ${items[count].id}`)
  }
  render() {
    let count = this.props.count;
    let item = this.props.items[count];
    return (
      <li onClick={() => this.handleClick(this.props.items, count)} key={item.id}><span>{count + 1}.</span> {item.text}</li>
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
