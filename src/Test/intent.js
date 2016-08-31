import xs from 'xstream'

export default function intent({DOM, storage}) {
  // kepress events from input element
  const add$ = DOM.select('.add')
    .events('click')
    .map(function(ev) {
      console.log(ev)
      return {
        key: 'inputText',
        value: ev.target.value
      };
    })


  const testDetail$ = storage.local.getItem('Tests')
    .startWith('')

  const studentScore$ = storage.local.getItem('Scores')
    .startWith('')

  return {
    DOM: add$,
    storage: xs.merge(testDetail$, studentScore$)
      .map(({details, scores})=>{
        // this is probably too verbose
        return {
          details,
          scores
        }
      })
  }
}
