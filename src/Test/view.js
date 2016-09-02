import xs from 'xstream'
import {h1, ul, li, div, button, input, span, p, section} from '@cycle/dom'

function renderHeader(data) {
  return h1('.testname', 'Test name: ' + data.name + ' ((TODO: click to change name))')
}

function renderMiddle(data) {
  console.dir(data.scores[0].scoreItem.DOM)
  return section('.middle',[
      p('Input Student Names & Scores'),
      // Scores for each student
      ul('.scores-list', data.scores
        // .map(a=>{console.log('DOM u',a.scoreItem.DOM);return a})
        .map(score => score.scoreItem.DOM)
      ),
      button('.add', 'add')
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
// view expects stream of quizData
export default function view(state$) {
  return state$.map(quizData => {
    console.log('quizDataquizDataquizData', quizData);
     return div('.quiz',[
       renderHeader(quizData),
       renderMiddle(quizData),
       renderBottom(quizData),
     ])
    })

}
