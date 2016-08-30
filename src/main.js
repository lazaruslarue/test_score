// Main.js in Application
import xs from 'xstream'
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeRouterDriver} from 'cyclic-router'
import {createHistory} from 'history'
import storageDriver from '@cycle/storage'


import StudentCollection from './StudentCollection'

function intent(DOMSource, storageSource) {
  let storageRequests$ = DOMSource.select('input')
    .events('keypress')
    .debug((ev) => {
      return console.log(ev)}
    )
    .map(( ev ) =>{
      return {
        key: 'inputText',
        value: ev.target.value
      }
    })



  return {
    DOM: storageSource.local
      .getItem('inputText')
      .startWith('')
      .map((text) => {
        input({props: {
          type: 'text',
          value: text,
        }})
      }),
    storage: storageRequests$,
  }
}

function model(response$) {

  return undefined
}

function view(state$) {
  return StudentCollection(state$).DOM
}

function main(sources) {


  // click actions
  let response$ = intent(sources.DOM, sources.storage)

  // application state stream
  let state$ = model(response$)
  // application view combines static components
  let view$ = view(state$)

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
