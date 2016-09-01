import xs from 'xstream'

export default function model(action$, storage$) {

  // every add request, should dump something to the local storage
  // let's not get too detailed with it... but this requires smarts

  const existing$ = xs.of({
      name: 'Test',
      score: 25
    })
  // const testDetail$ = storage.local.getItem('Tests')
  //   .startWith('')
  //
  // const studentScore$ = storage.local.getItem('Scores')
  //   .startWith('')

  const score$ = xs.of()

  return xs.merge(action$, score$, storage$)
    .map((data) => {
      // this is probably too verbose
      console.log('data in model',data)

      return data
    })

}
