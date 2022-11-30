import React from 'react'
import ExampleLayout from '../components/ExampleLayout'
import Nav from '../components/Nav'

function Home() {
  // const gridProps = window.gridProps || {}
  // const test = React.createElement(ExampleLayout, gridProps)
  return (
    <div>
      <Nav />
      <button className="sort_btn">정렬</button>
      <div className="frame">
        <ExampleLayout />
        <button>추가</button>
      </div>
    </div>
  )
}

export default Home
