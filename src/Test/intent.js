import xs from 'xstream'

export default function intent(DOMsource, remove$) {
  // kepress events from input element
  // Add new
  const add$ = DOMsource.select('.add')
    .events('click')
    .map(function(ev) {
        console.log('add reqeust',ev)
      return {
        key: 'Score',
        value:  'new Student'
      };
    })

  const changeRequest$ = xs.merge(add$, remove$)


  return changeRequest$
}
