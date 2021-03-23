import './buttons.css'

export const Buttons = ({selectPage, countPages, selectedNumberPage}) => {
  // булево значение для определения первой и последней кнопки пагинации
  const isFirstPage = selectedNumberPage === 1
  const isLastPage = selectedNumberPage === countPages.length

  // булево значение для определения когда показывать первую и последнюю кнопку пагинации
  const isFirstOrSecondPage = selectedNumberPage === 1 || selectedNumberPage === 2
  const isLasttOrPenultimatePage = selectedNumberPage === countPages.length || selectedNumberPage === countPages.length - 1

  // определяем какие кнопки будут видны в пагинации
  const visiblePages = 
    isFirstPage ? countPages.slice(selectedNumberPage - 1, selectedNumberPage + 2) 
    : isLastPage ? countPages.slice(selectedNumberPage - 3, selectedNumberPage + 1) 
    : countPages.slice(selectedNumberPage - 2, selectedNumberPage + 1)

  // создаем отдельный компонент для избежания повторного набора одного и того же кода
  const Button = ({children, numberOfPage}) => (
    <div 
      onClick={() => selectPage(numberOfPage)} 
      className={selectedNumberPage === children ? 'button button__selected' : 'button'}
    >
      <span>{children}</span>
    </div>
  )

  return (
    <div className='buttons'>
      {!isFirstOrSecondPage && (
        <div className='button__first'>
          <Button numberOfPage={0}>
            1
          </Button>
        </div>
      )}

      {visiblePages?.map(i => (
        <Button key={i} numberOfPage={i}>
          {i + 1}
        </Button>
      ))}

      {!isLasttOrPenultimatePage && (
        <div className='button__last'>
          <Button numberOfPage={countPages.length - 1}>
            {countPages.length}
          </Button>
        </div>
      )}
      </div>
  )
}
