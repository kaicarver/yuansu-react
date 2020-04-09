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
      <div id="help"><Detail /></div>
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
    let el = props.el;
    let decomp = "?";
    e.stopPropagation();
    console.log(Object.entries(el).map(x => x[0] + ': ' + x[1]).join('\n'));
    let char = el.trad;
    if (!hanzi.getPinyin(char)) {
      console.log("unknown element " + char);
    } else {
      console.log("pinyin", hanzi.getPinyin(char));
      // Character decomposition
      // 3 levels of decomposition (can specify which type in optional type parameter):
      // 1 - "Once" (only decomposes character once),
      // 2 - "Radical" (decomposes character into its lowest radical components),
      // 3 - "Graphical" (decomposes into lowest forms, will be mostly strokes and small indivisable units)
      console.log("Decompose a character in the dictionary:");
      let decomposition;
      //decomposition = hanzi.decompose(char);
      //console.log("all levels", decomposition);
      decomposition = hanzi.decompose(char, 1);
      console.log("one level", decomposition.components);
      decomp = decomposition.components.join(" ")
      decomposition = hanzi.decompose(char, 2);
      console.log("radical components", decomposition.components);
      decomposition = hanzi.decompose(char, 3);
      console.log("smallest parts: strokes", decomposition.components);
      //decomposition = hanzi.decomposeMany('爱橄黃');
      //console.log(decomposition);
      console.log("Lookup a character in the dictionary:");
      console.log(hanzi.definitionLookup(char));
      console.log("Search the dictionary based on input (I don't get search type 'only'...):");
      console.log(hanzi.dictionarySearch(char));
      console.log("Search, then puts entries in three categories by frequency (so really another kind of search?):");
      console.log(hanzi.getExamples(char));
      //console.log("Return an array of characters that are segmented based on a longest match lookup:");
      //console.log(hanzi.segment("我們都是陌生人。"));
      console.log("Return all possible pinyin data for a character:");
      console.log(hanzi.getPinyin(char));
      console.log("Return frequency data for a character based on the Junda corpus:")
      console.log(hanzi.getCharacterFrequency(char));
      // console.log("Get a character based on its position the frequency list:")
      // console.log(hanzi.getCharacterInFrequencyListByPosition(111));
      console.log("Return an array of characters with the given component:")
      console.log(hanzi.getCharactersWithComponent(char));
      console.log("Return an object that displays all possible combinations of phonetic regularity relationship of the character to all its components")
      console.log(hanzi.determinePhoneticRegularity(char));
      console.log("Return a short, usually one-word, meaning of a radical:")
      console.log(hanzi.getRadicalMeaning(char));
    }
    document.getElementById('detail').innerHTML =
      renderToString(<Detail key={el.symbol} el={el} decomp={decomp}/>);
  }
  return <span className="element" title={props.el.name} onClick={handleClick}>
    {props.el.trad} </span>
}

function Detail(props) {
  const zhspace = "　";
  let el = props.el ? props.el : { trad: "元素週期表", simp: "", symbol: "Periodic Table", discovered_by: "Dmitri Mendeleev" };
  // the hanzi call needs error handling, fails badly in some cases
  return <div>
    <div className="chinese">
      <span className="trad">{el.trad} </span>
      <span className="simp">{el.simp !== el.trad ? el.simp : zhspace} </span>
      <span className="pinyin">{(hanzi.getPinyin(el.trad) || ['?'])[0]}</span>
      <div className="components">{props.decomp}</div>
    </div>
    <div className="english">{el.symbol}</div>
    <a href={el.source} target="_blank" rel="noopener noreferrer">{el.name}</a><br />
    {el.period} {el.number} {el.atomic_mass}<br />
    discovery: {el.discovered_by}
    <div className="summary">{el.summary}</div>
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
