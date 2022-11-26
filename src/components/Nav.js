import React, { useEffect, useState } from 'react'

const catagoryList = [
  'Recent',
  'to-do-list',
  'fashion',
  'drawing',
  'assignment',
]

function Nav() {
  // 카테고리 목록 가져오기
  useEffect(() => {
    catagoryList.forEach((category) => {
      const a = document.createElement('a')
      a.href = '#'
      a.innerText = category
      document.getElementById('categoryList').appendChild(a)
    })
  })

  const [isOpen, setIsOpen] = useState(false)

  const openCategory = () => {
    document.getElementById('mySidenav').style.width = '300px'
  }

  const closeCategory = () => {
    document.getElementById('mySidenav').style.width = '0'
  }

  const openLogin = () => {
    window.location.href = '/login'
  }

  const openRegister = () => {
    window.location.href = '/register'
  }
  return (
    <div>
      <div id="mySidenav" class="sidenav">
        <div id="categoryList">
          <a href="javascript:void(0)" class="closebtn" onClick={closeCategory}>
            &times;
          </a>
          <div id="cate_title">Catagory</div>
        </div>
        <div class="add_btn">Add Catagory</div>
      </div>
      <nav id="nav">
        <div className="nav">
          <div id="icon" onClick={openCategory}>
            <img src="assets/img/menu.png" />
          </div>

          <div className="logo">
            <a href="/">서랍</a>
          </div>
          <div className="empty" />
          {/* ------------마이페이지------------- */}
          <div id="icon" onClick={() => setIsOpen(!isOpen)}>
            <img src="assets/img/user.png" />
          </div>
          {isOpen && (
            <div className="select">
              <ul>
                <div onClick={openLogin}>로그인</div>
                <div onClick={openRegister}>회원가입</div>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Nav
