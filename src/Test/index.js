import xs from 'xstream'
import {div, p, input} from '@cycle/dom'

import intent from './intent'
import view from './view'
import model from './model'

// A Test has a name, and list of scores:
export default function Test(sources) {

  // Add new
  // Remove (needs to come from student list)
  const action$ = intent(sources);
  // Scores & min/max/avg
  const state$ = model(action$);

  const view$ = view(state$);

  let sinks = {
    DOM: view$
  }

  return sinks
}
