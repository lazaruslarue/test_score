import xs from 'xstream'
import {div, button, input, span, p} from '@cycle/dom'

export default function view(state$) {

  return state$.map((student) => {
    console.log('list rendering');
     return div('.test',[
       div('.testname', 'Your test TODO: click to change name'),
       div('.body', [
         p('Input Student Names & Scores'),
         // Scores for each student
         div('.scores', [
           input('.input',{props: {
             type: 'text',
             value: 'ass'
           }}),
         ]),
         button('.add', 'add'),
         span('.results', [
           p('Results'),
           p('Average: '),
           p('Min: '),
           p('Max: '),
         ])
       ]),
     ])
    })
}
