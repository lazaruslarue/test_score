import xs from 'xstream'

export default function model(props$, action$) {

  let newProps$ = props$.startWith({ name: 'dingle', score: 100})
  .debug(console.log)

  // let change$ = xs.merge(
  //   action$.filter(a => a.type === 'editScore').mapTo(true),
  //   action$.filter(a => a.type === 'deleteScore').mapTo(false)
  // ).startWith(false)

  return newProps$
}
