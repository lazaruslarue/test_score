import xs from 'xstream'

export default function model({request$, storage}) {
  const stored$ = storage.startWith('')
  return stored$
}
