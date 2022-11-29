import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import axios from 'axios'

const testData = {
  contents_id: 12,
  title: '창섭이 오늘 전과자 촬영',
  text: '창섭이 오늘 전과자 촬영으로 삼육대 물치과 갔대요!!',
  image: 'https://pbs.twimg.com/media/Fis8smTUYAATw97?format=jpg&name=medium',
  link: 'https://twitter.com/yook52_yj/status/1597437246667632641',
}

function Content() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  // 백엔드에 콘텐츠 id 보내서 콘텐츠 데이터 가져오기
  // const getContent = async () => {
  //   const url = `http://127.0.0.1:8000/contents/${id}`
  //   try {
  //     const response = await axios.get(url)
  //     setData(response.data)
  //   } catch (e) {
  //     alert('컨텐츠를 가져오지 못했습니다.')
  //   }
  // }

  // useEffect(() => {
  //   getContent()
  //   setLoading(false)
  // }, [])

  const onClick = () => {
    window.location.href = `/contents/${id}/edit`
  }

  useEffect(() => {
    setData(testData)
    setLoading(false)
    console.log(id)
  }, [])

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <Nav />
      <button className="sort_btn" onClick={onClick}>
        수정
      </button>
      <div className="out_box">
        <div className="in_box flex_col">
          <h1>제목: {data.title}</h1>
          <img className="img_size" src={data.image}></img>
          <p>내용: {data.text}</p>
          <a href={data.link}>{data.link}</a>
        </div>
      </div>
    </div>
  )
}

export default Content
