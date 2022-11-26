import { useState } from 'react';
import Nav from '../components/Nav';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const LoginSubmit = (e) => {
    e.preventDefault();
    setId(e.target.id.value);
    setPassword(e.target.password.value);

    // 서버에 보낼 데이터
    // 처음 console에 찍을 때 반영 안되는 오류 있음
    let data = {
      id: id,
      password: password,
    };
    console.log(data);
  };

  return (
    <div id='login'>
      <Nav />
      <div id='container'>
        <div className='box'>
          <form className='flex_col top_margin' onSubmit={LoginSubmit}>
            <input type='text' required name='id' placeholder=' 아이디'></input>
            <input
              type='password'
              required
              name='password'
              placeholder=' 비밀번호'
            ></input>
            <button>로그인</button>
          </form>
          <div className='flex_row center'>
            <a href='/'>아이디찾기 | </a>
            <a href='/'>비밀번호찾기 | </a>
            <a href='/register'>회원가입</a>
          </div>

          {/* 소셜로그인 */}
        </div>
      </div>
    </div>
  );
}
