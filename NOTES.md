# Implementation notes

This is just to document various choices I made along the way of doing this.

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

## How to pass data up and down component levels

I find I'm unsure how to pass data. For a TODO list, do I pass each item separately, maybe with its count? Or do I pass the items array, which would allow an item to delete or move itself? But the item shouldn't know about that data structure... Probably I should just pass a function?

## The rabbit hole

I'm finding it too easy to fall into a rabbit hole of searching for technical info on every detail of React. It seems like a moving target. I'll try to avoid it by keeping things super simple and not investigating every last bit.

