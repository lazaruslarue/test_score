import xs from 'xstream'
import {div, p, input} from '@cycle/dom'

import intent from './intent'
import model from './model'
import view from './view'


// A Score includes: student name, student score
export default function Score({DOM, prop$}) {
  // // updates to
  // const action$ = intent(sources);
  //
  // const state$ = {
  //   id: 1,
  //   name: 'name', // todo: get name based on ID
  //   score: 100,
  // }
  //
  // const view$ = view(state$);

  const action$ = intent(DOM)
  const state$ = model(prop$, action$)
  const vtree$ = view(state$)

  let sinks = {
    DOM: vtree$,
    action$
  }

  return sinks
}
