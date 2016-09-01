export default function intent({DOM, storage}) {
  // kepress events from input element
  const exitvalue$ = DOM.select('input')
    .events('keyup')
    .map(function(ev) {
      return {
        key: 'inputText',
        value: ev.target.value
      };
    })

  return {
    storage: storage.local.getItem('inputText')
      .startWith(''),
    DOM: exitvalue$,
  }
}
