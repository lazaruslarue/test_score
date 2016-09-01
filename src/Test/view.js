import xs from 'xstream'
import {h1, ul, div, button, input, span, p, section} from '@cycle/dom'

function renderHeader(data) {
  console.log('headerrender',data);
  return h1('.testname', 'Test name: ' + data.name + ' ((TODO: click to change name))')
}

function renderMiddle(data) {
  return section('.middle',[
    div('.body', [
      p('Input Student Names & Scores'),
      // Scores for each student
      div('.scores', [
        input('.input',{props: {
          type: 'text',
          value: 'ass'
        }}),
      ]),
      ul('.scores-list', data.scores
        .map(score => {
          console.log(score,'lkjsdflksjdflksdjf');
          return score
        })
        .map(score=>score.DOM)
      ),
      button('.add', 'add')
    ])
  ])
}

function renderBottom(quizData) {
  return span('.results', [
    p('Results'),
    p('Average: '),
    p('Min: '),
    p('Max: '),
  ])
}
export default function view(quizData$) {
//start here!! make the header, then make a bunch of students.
// you'll need a DOM for each student, i guess?
// debugger


  return quizData$.map((quizData) => {
    console.log('test rendering', quizData);
     return div('.test',[
       renderHeader(quizData),
       renderMiddle(quizData),
       renderBottom(quizData),
     ])
    })

}
