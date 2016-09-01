import xs from 'xstream'
import isolate from '@cycle/isolate'
import {div, p, input} from '@cycle/dom'

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

    let response = {
      ...quizData,
      // we're turning the score data into streams
      // and adding scoreItem components to the list
      // this could be handled with Collection library, too
      scores: quizData.scores.map(data => {
        // data that can be subscribed to
        let props$ = xs.of(data)
        // discreet/isolated/scoped components
        let scoreItem = isolate(Score)({DOM: DOMsource, props$})

        return {
          ...data,
          // we add the isolated Score component to the general
          // data model
          scoreItem: {
            DOM: scoreItem.DOM,
            // these actions get fed back to us
            action$: scoreItem.action$.map(ev => ({...ev, id: data.id}))
          }
        }
      })
    }
    console.log('amender response:' , response);
    return response
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
    .map(({scores})=> xs.merge(...scores.map(i => i.scoreItem.action$)))
    .flatten()

  // our Proxy from above will now have itemAction$ overlayed
  proxyItemAction$.imitate(itemAction$)


  const view$ = view(amendedState$);

  const storage$ = serialize(state$).map((state) => ({
    key: 'Test', value: state
  }))

  return {
    // requests to draw the DOM
    DOM: view$,
    storage: storage$,
  }

}
