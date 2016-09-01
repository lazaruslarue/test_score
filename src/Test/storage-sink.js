// Turn the data object that contains
// the todos into a string for localStorage.
// export default function serialize(scores$) {
//   return scores$.map(test => JSON.stringify(
//     {
//       list: test.scores.map(scoreData =>
//         ({
//           name: scoreData.name,
//           score: scoreData.score,
//         })
//       )
//     }
//   ));
// };


// Turn the data object that contains
export default function serialize(storage$) {

  return storage$.map(val => JSON.stringify(val))

};
