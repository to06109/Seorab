import { useState } from 'react'
import Nav from '../components/Nav'
import GoogleButton from '../components/GoogleButton'
import jwt_decode from 'jwt-decode'
import bcrypt from 'bcryptjs'
import axios from 'axios'

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

  data['platform_type'] = 'general'

  // 백엔드 연동할 때 풀기 -> 로그인 성공 시 메인으로 redirect
  const [resGeneralData, setResGeneraldata] = useState('')
  const [resGoogleData, setResGoogledata] = useState('')
  const url = 'http://127.0.0.1:8000/login'

  const onClick = async (e) => {
    e.preventDefault()

    //비밀번호 암호화
    bcrypt.hash(data['password'], 5, (err, hashedPassword) => {
      if (err) throw new Error('비밀번호 암호화 오류')
      data['password'] = hashedPassword
    })

    const reqData = JSON.stringify(data)

    // 백엔드 연동할 때 풀기
    try {
      const response = await axios.post(url, reqData, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json',
        },
      })
      setResGeneraldata(response.data)
      console.log(resGeneralData)
      alert('로그인 성공했습니다.')
    } catch (e) {
      console.log(e)
      alert('해당 id가 존재하지 않습니다.')
    }
  }

  // https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions#handle_credential_response
  const onGoogleSignIn = async (res) => {
    // postGoogleLogin: 서버에 인가 토큰 보내는 함수 -> 이 응답이 로그인 성공일 경우 홈으로 리다이렉트
    //콜백 함수
    const responsePayload = jwt_decode(res.credential)
    // name, email, platform_type: google\
    const googleUser = {
      name: responsePayload.name,
      email: responsePayload.email,
      password: 'test',
      platform_type: 'google',
    }
    const reqGoodleData = JSON.stringify(googleUser)
    // console.log('구글 로그인', reqGoodleData)

    // 백엔드 연동할 때 풀기
    try {
      const response = await axios.post(url, reqGoodleData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setResGoogledata(response.data)
      console.log(resGoogleData)
    } catch (e) {
      console.log(e)
      alert('해당 id가 존재하지 않습니다.')
    }
  }

  return (
    <div id="login">
      <Nav />
      <div id="container">
        <div className="box">
          <form className="flex_col top_margin" onSubmit={onClick}>
            <div className="empty_login" />
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
          <GoogleButton onGoogleSignIn={onGoogleSignIn} />
        </div>
      </div>
    </div>
  )
}
