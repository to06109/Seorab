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

function EditContent() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    title: '',
    text: '',
    image: '',
    link: '',
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  data['contents_id'] = id

  // 백엔드에 콘텐츠 id 보내서 콘텐츠 데이터 가져오기
  // const getContent = async () => {
  //   const url = `http://127.0.0.1:8000/contents/${id}/edit`
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

  // 백엔드에 수정내용 전달
  // const [resData, setResdata] = useState('');
  // const url = 'http://127.0.0.1:8000/${id}/edit' ;

  const onSubmit = async (e) => {
    e.preventDefault()

    const reqData = JSON.stringify(data)
    console.log(reqData)
    // try{
    //   const response = await axios.post(url, reqData,{
    //     headers: {
    //       // Overwrite Axios's automatically set Content-Type
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   setResdata(response.data);
    // } catch (e) {
    //   console.log(e)
    //   alert("해당 id가 존재하지 않습니다.")
    // }
  }

  useEffect(() => {
    setData(testData)
    setLoading(false)
  }, [])

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <Nav />
      <div className="out_box">
        <div className="in_box flex_col">
          <form className="flex_col top_margin" onSubmit={onSubmit}>
            <label for="title">제목: </label>
            <input
              id="title"
              name="title"
              placeholder="Title"
              value={data.title}
              onChange={onChange}
            ></input>
            <label for="title">이미지 링크: </label>
            <input
              id="image"
              name="image"
              placeholder="ImageLink"
              value={data.image}
              onChange={onChange}
            ></input>
            <label for="text">내용: </label>
            <input
              id="text"
              name="text"
              placeholder="Text"
              value={data.text}
              onChange={onChange}
            ></input>
            <label for="link">링크: </label>
            <input
              id="link"
              name="link"
              placeholder="Link"
              value={data.link}
              onChange={onChange}
            ></input>
            <button type="submit">저장</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditContent
