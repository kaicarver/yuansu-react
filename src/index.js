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
let rows = [[],[],[],[],[],[],[],[],[],[],[]];
//console.log("rows1: ", rows);
// isnt this the same?
//rows = Array(11).fill([]]);
//console.log("rows2: ", rows);
periodicData.elements.forEach(el => rows[el.ypos].push(el));
//console.log("rows3: ", rows);

rows.shift();
function PeriodicTable(props) {
  return <div>
    <h1>Periodic Table</h1>
    <div>
      <div id="help">(click or mouseover element for details)</div>
      {rows.map((row, period) => 
        row.map(el => <span key={el.symbol}><Element el={el} /> </span>).concat(<br/>)
      )}
    </div>
    <div id="detail">...</div>
  </div>;
}

function Element(props) {
  function handleClick(e) {
    console.log(Object.entries(props.el).map(x => x[0] + ': ' + x[1]).join('\n'));
    document.getElementById('detail').innerHTML = `
${props.el.trad} ${props.el.simp} ${props.el.symbol} ${props.el.period} ${props.el.number} ${props.el.atomic_mass}<br>
${props.el.name}<br>
${props.el.source}<br>
discovered: ${props.el.discovered_by}<br>
${props.el.summary}
`.trim();
  }
  return <span title={props.el.name} onClick={handleClick} onMouseOver={handleClick}>
    {props.el.trad}
  </span>;
}

ReactDOM.render(
  <React.StrictMode>
    <PeriodicTable />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
