import xs from 'xstream'

// find a score's index, obv
function searchScoreIndex(scoresList, scoreId) {
  let pointerId
  let index
  let top = scoresList.length
  let bottom = 0;
  // binary search. loops till it narrows to index.
  for (let i = scoresList.length -1; i >= 0; i--) {
    index = bottom + ((top - bottom ) >> 1)
    pointerId = scoresList[index].id
    if (pointerId === scoreId) {
      return index
    } else if (pointerId < scoreId) {
      return bottom = index
    } else if (pointerId > scoreId) {
      top = index
    }
  }
  return null
}

// handle the actions on the list. every reducer returns
// a complete quizData, updated as necessary for the action$
function makeReducer$(action$){
  const insertScoreReducer$ = action$
    .filter(a => a.type === 'newScore')
    .map(action => function insertScoreReducer(quizData) {
      let lastId = quizData.scores.length > 0 ?
        quizData.scores[quizData.scores.length - 1].id :
        0
      quizData.scores.push({
        id: lastId + 1,
        name: action.payload.name,
        score: action.payload.score,
      })
      return quizData
    })

  const editScoreReducer$ = action$
    .filter(a => a.type === 'editScore')
    .map(action => function editScoreReducer(quizData) {
      let scoreIndex = searchScoreIndex(quizData.scores, action.id)
      // TODO: optimize it, bruh. we could separate name edits & score edits, to conserve rerendering the min/max/avg
      quizData.scores[scoreIndex].score = action.payload.score
      quizData.scores[scoreIndex].name = action.payload.name
      return quizData
    })

  const deleteScoreReducer$ = action$
    .filter(a => a.type === 'deleteScore')
    .map(action => function deleteScoreReducer(quizData) {
      let scoreIndex = searchScoreIndex(quizData.scores ,action.id)
      quizData.scores.splice(scoreIndex, 1)
      return quizData
    })

  // because they're all returning the same quizData, we can
  // just merge. else, we'd need some complex extraplanetary
  // technology to solve the deep sense of confusion this could
  // create in our feeble brainorgans.
  return xs.merge(
    insertScoreReducer$,
    editScoreReducer$,
    deleteScoreReducer$
  )
}

export default function model(action$, sourceQuizData$) {

  // handle all the action types
  const reducer$ = makeReducer$(action$)
  // group it together
  return sourceQuizData$.map(sourceQuizData => reducer$.fold((quizData, reducer) => reducer(quizData), sourceQuizData).debug(a=>{console.log('inside the fold',a)})
  )
  .flatten()
  // retain the last data point so new subscribers always
  // have latest state
  .remember()
}
