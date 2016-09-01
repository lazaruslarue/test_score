import xs from 'xstream'
import {h1, ul, li, div, button, input, span, p, section} from '@cycle/dom'

function renderHeader(data) {
  console.log('headerrender',data);
  return h1('.testname', 'Test name: ' + data.name + ' ((TODO: click to change name))')
}

function renderMiddle(data) {

  return section('.middle',[
      p('Input Student Names & Scores'),
      // Scores for each student
      ul('.scores-list', data.scores
        .map(score =>score.scoreItem.DOM)
        // .map(score =>score.scoreItem.DOM)
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
export default function view(quizData$) {
  return quizData$.map(quizData => {
     return div('.test',[
       renderHeader(quizData),
       renderMiddle(quizData),
       renderBottom(quizData),
     ])
    })

}
