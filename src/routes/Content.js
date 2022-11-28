import React from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'

function Content() {
  const { id } = useParams()
  // 백엔드에 콘텐츠 id 보내서 콘텐츠 데이터 가져오기
  console.log(id)
  // const gridProps = window.gridProps || {}
  // const test = React.createElement(ExampleLayout, gridProps)

  return (
    <div>
      <Nav />
      <button className="sort_btn">수정</button>
    </div>
  )
}

export default Content
