// Main.js in Application
import xs from 'xstream'
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeRouterDriver} from 'cyclic-router'
import {createHistory} from 'history'
import storageDriver from '@cycle/storage'


import StudentCollection from './StudentCollection'

function intent(DOMSource) {
  return undefined
}

function model(action$) {
  return undefined
}

function view(state$) {
  return StudentCollection().DOM
}

function main(sources) {
  // click actions
  const action$ = intent(sources.DOM)
  // application state stream
  const state$ = model(action$, sources)
  // application view combines static components
  const view$ = view(state$)

  return {
    DOM: view$
  }
}

const drivers = {
  DOM: makeDOMDriver('#root'),
  router: makeRouterDriver(createHistory()),
  storage: storageDriver,
};

run(main, drivers);
