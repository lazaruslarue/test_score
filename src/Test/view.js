import xs from 'xstream'
import {div, button, input, span, p} from '@cycle/dom'

export default function view(state$) {
  const score$ = xs.of({
    name: 'krinchar',
    score: 20
  }, {
    name: 'daveguy',
    score: 85
  }, {
    name: 'elzapatista',
    score: 98
  })


  return score$.map((student) => {
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
