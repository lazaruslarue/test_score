import xs from 'xstream'
import {div, p, input, li} from '@cycle/dom'

import intent from './intent'
import model from './model'
import view from './view'


// A Score includes: student name, student score
export default function Score({DOM, props$}) {

  const action$ = intent(DOM)
  const state$ = model(props$, action$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$,
    action$,
  }


}
