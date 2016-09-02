import xs from 'xstream'

export default function intent(DOM) {
  return xs.merge(
    // delete clicks
    DOM.select('.delete')
      .events('click')
      .mapTo({type: 'deleteScore'})
  )
}
