import xs from 'xstream'

export default function intent(DOM) {
  return xs.merge(
    // delete clicks
    DOM.select('.middle')
      .events('click')
      .mapTo({type: 'deleteScore'})
  )
  .debug(a=>{console.log('SCORE INTENT',a); debugger})
}
