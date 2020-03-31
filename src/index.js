import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// is there a way to import array directly without the extra "element" indirection?
import chineseData from './ElementsChinese.json';
import periodicData from './PeriodicTable.json';

// missing element 119 in Chinese?
periodicData.elements.forEach((el, i) => {
  periodicData.elements[i] = { ...periodicData.elements[i], ...chineseData.elements[i] }
});
console.log(periodicData.elements);
let rows = [[],[],[],[],[],[],[],[],[]];
//console.log("rows1: ", rows);
// isnt this the same?
//rows = Array(9).fill([]]);
//console.log("rows2: ", rows);
periodicData.elements.forEach(el => rows[el.period].push(el));
//console.log("rows3: ", rows);

rows.shift();
function PeriodicTable(props) {
  return <div>
    <h1>Periodic Table</h1>
    <div>
      {rows.map((row, period) => 
        [<div key={period+1}>{period+1}</div>].concat(row.map(el => <span key={el.symbol}><Element el={el} /> </span>).concat(<br/>))
      )}
    </div>
  </div>;
}

function Element(props) {
  function handleClick(e) {
    alert(props.el.name)
  }
  return <span title={props.el.name} onClick={handleClick}>
    {props.el.trad} {props.el.simp} {props.el.symbol} {props.el.number}
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
    document.title = "Kai's Periodic Table App in React"
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
    items.push({
      text: 'Click!',
      id: Date.now()
    });
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
