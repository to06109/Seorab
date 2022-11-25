import React from 'react'

function Nav() {
  const openNav = () => {
    document.getElementById('mySidenav').style.width = '250px'
  }

  const closeNav = () => {
    document.getElementById('mySidenav').style.width = '0'
  }
  return (
    <div>
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      <nav id="nav">
        <div className="nav">
          <div id="icon" onClick={openNav}>
            <img src="assets/img/menu.png" />
          </div>

          <div>
            <a href="#">서랍</a>
          </div>
          <div id="icon">
            <img src="assets/img/user.png" />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
