import { useState } from 'react'
import Nav from '../components/Nav'

export default function Login() {
  const [data, setData] = useState({
    id: '',
    password: '',
  })

  const { id, password } = data

  const onChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const reqData = JSON.stringify(data)

  // 백엔드 연동할 때 풀기
  // const [resData, setResdata] = useState('');
  // const url = 'http://127.0.0.1:8000/test/getMembers/' ;

  const onClick = async (e) => {
    e.preventDefault()
    console.log(id, password)
    console.log(reqData)

    // 백엔드 연동할 때 풀기
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

  return (
    <div id="login">
      <Nav />
      <div id="container">
        <div className="box">
          <form className="flex_col top_margin" onSubmit={onClick}>
            <input
              name="id"
              type="text"
              required
              placeholder=" 아이디"
              onChange={onChange}
            ></input>
            <input
              type="password"
              required
              placeholder=" 비밀번호"
              name="password"
              onChange={onChange}
            ></input>
            <button type="submit">로그인</button>
          </form>
          <div className="flex_row center">
            <a href="/">아이디찾기 | </a>
            <a href="/">비밀번호찾기 | </a>
            <a href="/register">회원가입</a>
          </div>

          {/* 소셜로그인 */}
        </div>
      </div>
    </div>
  )
}
