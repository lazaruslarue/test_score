// Turn the data object that contains
// the test data into a string for localStorage.
export default function serialize(scores$) {
  return scores$.map(test => {
    console.log('test', test);
    return JSON.stringify(
    {
      name: test.name,
      value: test.value,
      scores: test.scores.map(scoreData =>
        {
          return ({
          id: scoreData.id,
          name: scoreData.name,
          score: scoreData.score,
        })}
      )
    }
  )});
};
