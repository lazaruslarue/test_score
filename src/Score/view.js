import xs from 'xstream'
import {div, input, p} from '@cycle/dom'

export default function view(state$) {
  return state$.map((text) => {
     return div([input('.input',{props: {
       type: 'text',
       value: text
     }}), p(text)])
    })
}
