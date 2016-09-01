function merge() {
  let result = {};
  for (let i = 0; i < arguments.length; i++) {
    let object = arguments[i];
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        result[key] = object[key];
      }
    }
  }
  return result;
}

let safeJSONParse = str => JSON.parse(str) || {};

let mergeWithDefaultQuizData = quizData => {
// console.log('~~~~~~~~~ merge quizData', quizData);
  let result = merge({
    name: 'New Quiz',
    scores: [],
    value: 100,
  }, quizData);
  // console.log('result   ', result);
  // return todosData
  return merge({
    name: 'New Quiz',
    scores: [],
    value: 100,
  }, quizData);
}

// Take localStorage todoData stream and transform into
// a JavaScript object. Set default data.
export default function deserialize(localStorageValue$) {
  return localStorageValue$
    .map(safeJSONParse)
    .map(mergeWithDefaultQuizData);
};
