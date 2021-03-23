import './rows.css'

export const Rows = ({data}) => {
  return (
    data.map(item => (
      <div key={item.id} className='row'>
        <div className='row__number'>{item.id}</div>
        <div className='row__email'>{item.email}</div>
        <div className='row__name'>{item.name}</div>
        <div className='row__comment'>{item.body}</div>
      </div>
    ))
  )
}