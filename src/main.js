// Main.js in Application
import xs from 'xstream'
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'
import {makeRouterDriver} from 'cyclic-router'
import {createHistory} from 'history'

function intent(DOMSource) {
  return undefined
}

function model(action$) {
  return undefined
}

function view(action$) {
  return undefined
}

function main(sources) {
  // click actions
  const action$ = intent(sources.DOM)
  // application state stream
  const state$ = model(action$, sources)
  // application view combines static components
  const view$ = view(state$, sources)

  return {
    DOM: view$
  }
}

const drivers = {
  DOM: makeDOMDriver('#root'),
  // HTTP: makeHTTPDriver(),
  router: makeRouterDriver(createHistory()),
};

run(main, drivers);
