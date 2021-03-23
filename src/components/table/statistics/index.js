import './statistics.css'

export const Statistics = ({selectedNumberPage, filteredDataLength}) => {
  return (
    <div className='statistics'>
      <label>Selected page: #{selectedNumberPage}</label>
      <label>Amount of items: {filteredDataLength}</label>
    </div>
  )
}
