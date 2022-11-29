import { useState } from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import axios from 'axios'

export default function Register() {
  const [data, setData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
  })

  const { id, password, confirmPassword, name, email } = data

  const onChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const reqData = JSON.stringify({
    id,
    password,
    name,
    email,
  })

  // 백엔드 연동할 때 풀기
  const [resData, setResdata] = useState('')
  const url = 'http://127.0.0.1:8000/register'

  const onClick = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    //비밀번호 암호화
    bcrypt.hash(data['password'], 5, (err, hashedPassword) => {
      if (err) throw new Error('비밀번호 암호화 오류')
      data['password'] = hashedPassword
    })

    // 백엔드 연동할 때 풀기
    try {
      const response = await axios.post(url, reqData, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json',
        },
      })
      setResdata(response.data)
      console.log(resData)
      alert('회원가입 성공했습니다.')
    } catch (e) {
      console.log(e)
      alert('회원가입 문제가 있습니다.')
    }
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
              name="password"
              type="password"
              required
              placeholder=" 비밀번호"
              onChange={onChange}
            ></input>
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder=" 비밀번호 재확인"
              onChange={onChange}
            ></input>
            <input
              name="name"
              type="text"
              required
              placeholder=" 이름"
              onChange={onChange}
            ></input>
            <input
              name="email"
              type="text"
              required
              placeholder=" 이메일"
              onChange={onChange}
            ></input>
            <button type="submit">회원가입</button>
          </form>
          <div className="letter">
            이미 계정이 있으신가요?&nbsp;&nbsp;&nbsp;
            <Link to={`/login`}> go to Login</Link>
          </div>
          {/* 소셜로그인 */}
        </div>
      </div>
    </div>
  )
}
