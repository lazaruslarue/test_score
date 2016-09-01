import xs from 'xstream'
import {div, p, input} from '@cycle/dom'

import intent from './intent'
import view from './view'
import model from './model'
import deserialize from './storage-source'
import serialize from './storage-sink'

// A Test has a name, and list of scores:
export default function Test(sources) {

  // placeholder for Remote storage
  // the local storage.
  const localStorage$ = sources.storage.local.getItem('Test').take(1)
  const studentScore$ = deserialize(localStorage$);
  // items want to remove themselves
  const proxyRemove$ = xs.of()

  // user intent to remove/add, or change values
  const action$ = intent(sources.DOM, proxyRemove$);
  // Scores & min/max/avg
  const state$ = model(action$, studentScore$);

  const view$ = view(state$);

  let sinks = {
    // requests to draw the DOM
    DOM: view$,
    // requests to store
    storage: xs.of({
      key: "Test",
      value:'{"name":"test","value":100,"scores":[{"name":"krinchar","score":20},{"name":"daveguy","score":85},{"name":"elzapatista","score":101}]}'
    })
    // .debug(console.log)
  }

  return sinks
}
