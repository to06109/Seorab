import React, { useEffect } from 'react'

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

  const openNav = () => {
    document.getElementById('mySidenav').style.width = '300px'
  }

  const closeNav = () => {
    document.getElementById('mySidenav').style.width = '0'
  }
  return (
    <div>
      <div id="mySidenav" class="sidenav">
        <div id="categoryList">
          <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
            &times;
          </a>
          <div id="cate_title">Catagory</div>
        </div>
        <div class="add_btn">Add Catagory</div>
      </div>
      <nav id="nav">
        <div className="nav">
          <div id="icon" onClick={openNav}>
            <img src="assets/img/menu.png" />
          </div>

          <div className="logo">
            <a href="#">서랍</a>
          </div>
          <div className="empty" />
          <div id="icon">
            <img src="assets/img/user.png" />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
