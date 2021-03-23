import { useState } from 'react'
import { RiArrowDownSFill,RiArrowUpSFill } from 'react-icons/ri';
import './columns.css'

export const Columns = ({sortTable}) => {
  const [asc, setAsc] = useState(true) // определяем метод сортировки (по возврастанию, по убыванию)

  // определяем по какой колонке происходит сортировка и где показывать иконку вверх/вних
  const [iconId, setIconId] = useState(true)
  const [iconEmail, setIconEmail] = useState(false)
  const [iconName, setIconName] = useState(false)
  const [iconComment, setIconComment] = useState(false)
  
  const sortTableWithIcon = (type) => {
    // сортируем по выбранной колонке
    sortTable(type, asc)
    setAsc(!asc)

    // обнуляем стэйты для отбражения иконки
    setIconId(false)
    setIconEmail(false)
    setIconName(false)
    setIconComment(false)

    // вычисляем где показать иконку
    if (type === 'id') {
      setIconId(true)
    } else if (type === 'email') {
      setIconEmail(true)
    } else if (type === 'name') {
      setIconName(true)
    } else if (type === 'comment') {
      setIconComment(true)
    }
  }

  // создаем отдельный компонент для избежания повторного набора одного и того же кода
  const Item = ({children, type, state}) => (
    <div className='columns__item'>
      <span onClick={() => sortTableWithIcon(type)}>{children}</span>
      {state && (asc ? <RiArrowDownSFill /> : <RiArrowUpSFill />)}
    </div>
  )

  return (
    <div className='columns'>
      <div className='columns__number'>
        <Item type='id' state={iconId}>№</Item>
      </div>
      <div className='columns__email'>
        <Item type='email' state={iconEmail}>Email</Item>
      </div>
      <div className='columns__name'>
        <Item type='name' state={iconName}>Name</Item>
      </div>
      <div className='columns__comment'>
        <Item type='comment' state={iconComment}>Comment</Item>
      </div>
    </div>
  )
}
