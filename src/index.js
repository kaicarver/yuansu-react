import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import './index.css';
import * as serviceWorker from './serviceWorker';
// is there a way to import array directly without the extra "element" indirection?
import chineseData from './ElementsChinese.json';
import periodicData from './PeriodicTable.json';

//let hanzi = require("hanzi");
import hanzi from 'hanzi';
// the loading of the hanzi data should be done asynchronously...
// and maybe in a different file?...
hanzi.start();

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
  function handleClick(e) {
    console.log("no element");
    document.getElementById('detail').innerHTML =
      renderToString(<Detail />);
  }
  return <div id="table" onClick={handleClick}>
    {props.data.map((el, number) =>
      <Element key={el.symbol} el={el} />
    )}
  </div>
}

function Element(props) {
  // there's probably a better way to do this reactive thing
  function handleClick(e) {
    e.stopPropagation();
    console.log(Object.entries(props.el).map(x => x[0] + ': ' + x[1]).join('\n'));
    document.getElementById('detail').innerHTML =
      renderToString(<Detail key={props.el.symbol} el={props.el} />);
  }
  return <span className="element" title={props.el.name} onClick={handleClick}>{props.el.trad} </span>
}

function Detail(props) {
  const zhspace = "　";
  let el = props.el ? props.el : {trad:"元素週期表", simp:"", symbol:"Periodic Table", discovered_by:"Dmitri Mendeleev"};
  // the hanzi call needs error handling, fails badly in some cases
  return <div>
    <div className="chinese">
      <span>{el.trad} </span>
      <span>{el.simp !== el.trad ? el.simp : zhspace} </span>
      <div className="pinyin">{(hanzi.getPinyin(el.trad) || ['?'])[0]}</div>
    </div>
    <div className="english">{el.symbol}</div>
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
