# Implementation notes

This is just to document various choices I made along the way of doing this.

- [Implementation notes](#implementation-notes)
  - [Creation of initial project](#creation-of-initial-project)
  - [How to pass data up and down component levels?](#how-to-pass-data-up-and-down-component-levels)
  - [The rabbit hole](#the-rabbit-hole)
  - [Periodic table data](#periodic-table-data)
  - [What CSS to use for the Periodic Table?](#what-css-to-use-for-the-periodic-table)
  - [TODO list](#todo-list)

## Creation of initial project

I had this annoying problem that `create-react` in its various forms was not working for me.

After installing the latest version of node and using `nvm`, current versions:
```
$ nvm -version
0.353
$ node --version
v13.11.0
$ npm --version
6.13.7
```
and trying a bunch of the solutions listed here

https://stackoverflow.com/questions/59188624/template-not-provided-using-create-react-app

and failing, I ended up doing this which finally got me ok:

```bash
1437  npm uninstall -g create-react-app
1438  locate "create-react-app"
1439  rm -rf /home/kai/.nvm/versions/node/v12.13.1/bin/create-react-app /home/kai/.nvm/versions/node/v12.13.1/lib/node_modules/create-react-app /home/kai/node_modules/create-react-app  /home/kai/node_modules/.bin/create-react-app
1440  locate "create-react-app"
1441  ls `locate "create-react-app"`
1442  npm uninstall -g create-react-app
1443  npx create-react-app yuansu-react      
```

## How to pass data up and down component levels?

I find I'm unsure how to pass data. For a TODO list, do I pass each item separately, maybe with its count? Or do I pass the items array, which would allow an item to delete or move itself? But the item shouldn't know about that data structure... Probably I should just pass a function?

## The rabbit hole

I'm finding it too easy to fall into a rabbit hole of searching for technical info on every detail of React. It seems like a moving target. I'll try to avoid it by keeping things super simple and not investigating every last bit.

## Periodic table data

From here:

https://github.com/Bowserinator/Periodic-Table-JSON

There's also the `periodic-table` npm package, maybe wotth checking out, mentioned below.

## What CSS to use for the Periodic Table?

This looks like a good approach, with CSS Grid

https://responsivedesign.is/articles/creating-the-periodic-table-with-grid-css/

and Description Lists `<dl>`, `<dt>`, `<dd>`

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl

He also mention the `periodic-table` npm package,
which may or may not be redundant with the periodic data 
mentioned above.

https://www.npmjs.com/package/periodic-table

This article might be more strightforward using just divs and React

https://levelup.gitconnected.com/how-i-made-the-periodic-table-with-css-grid-and-react-69f94d7fcec

## TODO list

- highlight the selected element in the table
- use arrow keys to navigate table
- show different colors if (second) component pronunciation or tone is different from character pronunciation
- move Github link to bottom of page
- add more credits links, like I did in the Svelte version
  