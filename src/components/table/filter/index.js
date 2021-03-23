import './filter.css'

export const Filter = ({fiterTable}) => {
  return (
    <div className='filter'>
      <input 
        type='text' 
        placeholder='Input text for filter...' 
        onChange={fiterTable} 
      /> 
    </div>
  )
}
