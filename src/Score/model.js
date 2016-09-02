import xs from 'xstream'

export default function model(props$, action$) {
  let newProps$ = props$
  .map(a=>{console.log('MODEL', a); return a})
  .startWith({name: 'start', id: 0, score: 19 })

  let change$ = xs.merge(
    action$.filter(a => a.type === 'editScore').mapTo(true),
    action$.filter(a => a.type === 'deleteScore').mapTo(false)
  ).startWith(false)
return xs.combine(xs.of(1), xs.of(2))
  .map(([a,b])=>{
    debugger
    return {
      a,
      b
    }
  })
  return xs.combine(newProps$, change$)
    .map(([{name, id, score}, editing])=>{
debugger
      return ({
        name,
        id,
        score,
        editing
      })
    })
}
