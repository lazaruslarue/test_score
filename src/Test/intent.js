import xs from 'xstream'

export default function intent(DOMsource, proxyItemAction$) {
  // kepress events from input element
  // Add new
  const insert$ = DOMsource.select('.add')
    .events('click')
    .map(function(ev) {
        // at this point, a user has clicked.
        // we need to add this new student to the list
        console.log('click add reqeust',ev)

      return {
        type: 'newScore',
        payload: {name: '', score: 10}
      };
    })

  return xs.merge(insert$, proxyItemAction$)
}
