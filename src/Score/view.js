import xs from 'xstream'
import {li} from '@cycle/dom'


export default function view(state$) {
  return state$.map(data => {
    console.log('renderrenderrenderrender', data);
    return li('hello')
  })
}
