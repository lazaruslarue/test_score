import xs from 'xstream'

export default function intent(DOM) {
  return xs.merge(
    // delete clicks
    DOM.select('div')
      .events('click')
      .mapTo({type: 'deleteScore'})
  )
  .debug(console.log)
}
