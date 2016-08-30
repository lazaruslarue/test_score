import xs from 'xstream'
import {div, p} from '@cycle/dom'
// import Collection from '@cycle/collection'

export default function StudentCollection(sources) {

  let sinks = {
    DOM: xs.of(div('.StudentCollection', [
      p('StudentCollection')
    ]))
  }

  return sinks
}
