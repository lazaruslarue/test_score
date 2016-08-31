import xs from 'xstream'
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeRouterDriver} from 'cyclic-router'
import {createHistory} from 'history'
import storageDriver from '@cycle/storage'



//view
import {div, p, input} from '@cycle/dom'

function intent(DOM, storage) {
  // kepress events from input element
  const exitvalue$ = DOM.select('input')
    .events('keyup')
    .map(function(ev) {
      return {
        key: 'inputText',
        value: ev.target.value
      };
    })

  return {
    storage: storage.local.getItem('inputText')
      .startWith(''),
    DOM: exitvalue$,
  }
}

function model({request$, storage}) {
  let stored$ = storage.startWith('')
  return stored$
}

function view(state$) {
  return state$.map((text) => {
    console.log('view', text);
     return div([input({props: {
       type: 'text',
       value: text
     }}), p(text)])
    })
}

function main(sources) {
  // returns:  keypress input$ & storage$
  let action$ = intent(sources.DOM, sources.storage)
  // write dom elements from storage
  // store inputs locally
  let state$ = model(action$, sources.storage)
  // vDom$
  let view$ = view(state$)

  return {
    DOM: view$,
    storage: action$.DOM,
  }
}

const drivers = {
  DOM: makeDOMDriver('#root'),
  storage: storageDriver,
};

run(main, drivers);
