import { useState, useEffect } from 'react'
import { Statistics } from './statistics'
import { Filter } from './filter'
import { Columns } from './columns'
import { Rows } from './rows'
import { Buttons } from './buttons'
import './table.css'

export const Table = () => {
  const perPage = 50 // количество отображаемых элементов на одной странице
  const [data, setData] = useState([]) // неизменяемые данные таблицы
  const [filteredData, setFilteredData] = useState([]) // отображаемые данные таблицы, которые можно фильтровать
  const [countPages, setCountPages] = useState([]) // количество страниц для пагинации
  const [selectedPage, setSelectedPage] = useState([]) // данные выбранной страницы, на которой находится пользователь
  const [selectedNumberPage, setSelectedNumberPage] = useState(1) // номер выбранной страницы, на которой находится пользователь

  // получаем данные для работы с таблицей
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        setData(json)
        setFilteredData(json)
        setSelectedPage(json.slice(0, perPage))
      })
  }, [])

  // при получении и фильтрации данных вычисляем количество страниц для отображения
  useEffect(() => {
    const countPages = []
    for (let i = 0; i < Math.ceil(filteredData.length / perPage); i++) {
      countPages.push(i)
    }
    setCountPages(countPages)
  }, [filteredData])


  const fiterTable = (e) => {
    // фильтрация происходит по всем колонкам одновременно
    const buf = data.filter(item => (
      String(item.id).toLowerCase().includes(e.target.value.toLocaleLowerCase())
      || String(item.name).toLowerCase().includes(e.target.value.toLocaleLowerCase())
      || String(item.email).toLowerCase().includes(e.target.value.toLocaleLowerCase())
      || String(item.body).toLowerCase().includes(e.target.value.toLocaleLowerCase())
    ))

    setFilteredData(buf)
    setSelectedPage(buf.slice((selectedNumberPage - 1) * perPage, (selectedNumberPage - 1) * perPage + perPage))
    setSelectedNumberPage(1)
  }

  const sortTable = (type, asc) => {
    // получаем значение для сортровки по возврастанию или убыванию
    const sign = asc ? 1 : -1
    let buf = []

    // в зависимости от какой колонки, выбираем метод для сортировки
    if (type === 'id') {
      buf = [...filteredData.sort((a, b) => a.id < b.id ? sign : -sign)]
    } else {
      buf = [...filteredData.sort((a, b) => {
        let strA = ''
        let strB = ''
  
        if (type === 'email') {
          strA = a.email.toLowerCase()
          strB = b.email.toLowerCase()
        } else if (type === 'name') {
          strA = a.name.toLowerCase()
          strB = b.name.toLowerCase()
        } else if (type === 'comment') {
          strA = a.body.toLowerCase()
          strB = b.body.toLowerCase()
        }
        
        if (strA < strB) {
          return -sign
        }
        if (strA > strB) {
          return sign
        }
        return 0 
      })]
    }

    setSelectedPage(buf.slice((selectedNumberPage - 1) * perPage, (selectedNumberPage - 1) * perPage + perPage))
    setFilteredData(buf)
  }

  const selectPage = i => {
    // выбираем данные для показа в зависимости от страницы
    setSelectedPage(filteredData.slice(perPage * i, perPage * i + perPage))
    setSelectedNumberPage(i + 1)

    // при нажатии на какую-либо страницу будет происходить скролл вверх
    window.scroll({
      top: document.querySelector('.table').offsetTop,
      behavior: "smooth"
    });
  }

  return (
    <div className='table'>
      <Statistics 
        selectedNumberPage={selectedNumberPage} 
        filteredDataLength={filteredData.length} 
      />
      <Filter fiterTable={fiterTable} />
      <Columns sortTable={sortTable} />
      <Rows data={selectedPage} />
      {countPages.length !== 0 && (
        <Buttons 
          countPages={countPages} 
          selectPage={selectPage} 
          selectedNumberPage={selectedNumberPage} 
        />
      )}
    </div>
  )
}
