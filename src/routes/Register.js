import { useState } from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import bcrypt from 'bcryptjs'

export default function Register() {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  })

  const { email, password, confirmPassword, name } = data

  const onChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const reqData = JSON.stringify({
    email,
    password,
    name,
  })

  const url = 'http://127.0.0.1:8000/accounts/signup'

  const onClick = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    bcrypt.hash(data['password'], 5, (err, hashedPassword) => {
      if (err) throw new Error('비밀번호 암호화 오류')
      data['password'] = hashedPassword
    })

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: reqData,
    })
      .then((res) => {
        if (res.status === 400) {
          return alert('Failure Create Account')
        }
        return res.json()
      })
      .then((res) => {
        console.log(res)
        alert('Register success')
        window.location.href = '/login'
      })
      .catch((err) => alert('Failure connection', err))
  }

  return (
    <div id="login">
      <Nav />
      <div id="container">
        <div className="box">
          <form className="flex_col top_margin" onSubmit={onClick}>
            <input
              name="email"
              type="text"
              required
              placeholder=" 이메일"
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
            <button type="submit">회원가입</button>
          </form>
          <div className="letter">
            이미 계정이 있으신가요?&nbsp;&nbsp;&nbsp;
            <Link to={`/login`}> go to Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
