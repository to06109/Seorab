import { useState } from 'react'
import Nav from '../components/Nav'
import GoogleButton from '../components/GoogleButton'
import jwt_decode from 'jwt-decode'
import bcrypt from 'bcryptjs'
import axios from 'axios'

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  data['platform_type'] = 'general'

  // 백엔드 연동할 때 풀기 -> 로그인 성공 시 메인으로 redirect
  // const [resGeneralData, setResGeneraldata] = useState('')
  // const [resGoogleData, setResGoogledata] = useState('')
  const url = 'http://127.0.0.1:8000/accounts/signin/'

  const onClick = async (e) => {
    e.preventDefault()

    //비밀번호 암호화
    bcrypt.hash(data['password'], 5, (err, hashedPassword) => {
      if (err) throw new Error('비밀번호 암호화 오류')
      data['password'] = hashedPassword
    })

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 400) return alert('User not found')
        console.log(res)
        alert('Login success')
        window.location.href = '/'
        return res.json()
      })
      .catch((err) => alert('Failure connection', err))
  }

  // https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions#handle_credential_response
  const onGoogleSignIn = async (res) => {
    const responsePayload = jwt_decode(res.credential)
    const googleUser = {
      email: responsePayload.email,
      password: 'google',
      platform_type: 'google',
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googleUser),
    })
      .then((res) => {
        if (res.status === 400) {
          return alert('Google User not found')
        }
        return res.json()
      })
      .then((res) => {
        console.log(res)
        alert('Google Login success')
        // localStorage.setItem('userId', data.email)
        window.location.href = '/'
      })
      .catch((err) => alert('Failure connection', err))
  }

  return (
    <div id="login">
      <Nav />
      <div id="container">
        <div className="box">
          <form className="flex_col top_margin" onSubmit={onClick}>
            <div className="empty_login" />
            <input
              name="email"
              type="text"
              required
              placeholder=" 이메일"
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
