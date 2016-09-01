import xs from 'xstream'
import {div, p, input} from '@cycle/dom'
import isolate from '@cycle/isolate'

import intent from './intent'
import view from './view'
import model from './model'
import deserialize from './storage-source'
import serialize from './storage-sink'

import Score from './../Score'

// amend children so that they're observable sequences
function amendStateWithChildren(DOMsource) {
  return function (quizData) {
    console.log('ammender', quizData);

    return {
      ...quizData,
      // we're just turning the scores into streams
      // this could be handled with Collection library, too
      scores: quizData.scores.map(data => {
        // data that can be subscribed to
        const prop$ = xs.of(data)
        // discreet/isolated/scoped components
        const scoreItem = isolate(Score)({DOM: DOMsource, prop$})

        return {
          ...data,
          scoreItem: {
            DOM: scoreItem.DOM,
            // these actions get fed back to us
            action$: scoreItem.action$.map(ev => ({...ev, id: data.id}))
          }
        }
      })
    }
  }
}

// A Test has a name, and list of scores:
export default function Test(sources) {

  // placeholder for Remote storage
  // the local storage.
  const localStorage$ = sources.storage.local.getItem('Test').take(1)
  const sourceQuizData$ = deserialize(localStorage$);
  // items want to remove themselves
  const proxyItemAction$ = xs.create()

  // user intent to remove/add, or change values
  const action$ = intent(sources.DOM, proxyItemAction$)
  // Scores & min/max/avg
  const state$ = model(action$, sourceQuizData$);

  const amendedState$ = state$
    .map(amendStateWithChildren(sources.DOM))
    .remember()

  const itemAction$ = amendedState$
    .debug(e=>{console.log('test')})
    .map(({scores})=> xs.merge(...scores.map(i => i.scoreItem.action$)))
    .flatten()

  // our Proxy from above will now have itemAction$ overlayed
  proxyItemAction$.imitate(itemAction$)


  const view$ = view(amendedState$);

  let sinks = {
    // requests to draw the DOM
    DOM: view$,
    // requests to store
    // storage: xs.of({
    //   key: "Test",
    //   value:'{"name":"NewTest","value":100,"scores":[{"name":"krinchar","score":20},{"name":"daveguy","score":85},{"name":"elzapatista","score":101}]}'
    // })
    // .debug(console.log)
  }

  return sinks
}
