import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import './index.css';
import * as serviceWorker from './serviceWorker';
// is there a way to import array directly without the extra "element" indirection?
import chineseData from './ElementsChinese.json';
import periodicData from './PeriodicTable.json';

// missing element 119 in Chinese
// anyway Ununennium is a little bogus
periodicData.elements.pop();
periodicData.elements.forEach((el, i) => {
  periodicData.elements[i] = { ...periodicData.elements[i], ...chineseData.elements[i] }
});
console.log(periodicData.elements);

function YuansuApp(props) {
  return <div id="page">
    <div>
      <Table data={periodicData.elements} />
    </div>
    <div id="detail">
      <div id="help"><Detail/></div>
    </div>
    <div>
      Source: <a
        className="App-link"
        href="https://github.com/kaicarver/yuansu-react"
        target="_blank"
        rel="noopener noreferrer"
      >Github</a>
    </div>
  </div>;
}

function Table(props) {
  return <div id="table">
    {props.data.map((el, number) =>
      <Element key={el.symbol} el={el} />
    )}
  </div>
}

function Element(props) {
  // there's probably a bettter way to do this reactive thing
  function handleClick(e) {
    console.log(Object.entries(props.el).map(x => x[0] + ': ' + x[1]).join('\n'));
    document.getElementById('detail').innerHTML =
      renderToString(<Detail key={props.el.symbol} el={props.el} />);
  }
  return <span className="element" title={props.el.name} onClick={handleClick}>{props.el.trad} </span>
}

function Detail(props) {
  const zhspace = "　";
  let el = props.el ? props.el : {trad:"元素週期表", simp:"", symbol:"Periodic Table", discovered_by:"Dmitri Mendeleev"};
  return <div>
    <div class="chinese">
      <span>{el.trad} </span>
      <span>{el.simp !== el.trad ? el.simp : zhspace} </span>
    </div>
    <div class="english">{el.symbol}</div>
    <a href={el.source} target="_blank" rel="noopener noreferrer">{el.name}</a><br/>
    {el.period} {el.number} {el.atomic_mass}<br/>
    discovery: {el.discovered_by}<br/>
    {el.summary}
  </div>
}

ReactDOM.render(
  <React.StrictMode>
    <YuansuApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
