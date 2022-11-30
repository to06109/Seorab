import React from 'react'
import ShowcaseLayout from './ShowcaseLayout'

class ExampleLayout extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { layout: [] }
    // this.onLayoutChange = this.onLayoutChange.bind(this)
  }

  // onLayoutChange(layout) {
  //   this.setState({ layout: layout })
  // }

  // ----------------------콘텐츠 좌표 가져올 때 쓰기--------------------
  // stringifyLayout() {
  //   return this.state.layout.map(function (l) {
  //     console.log(l)
  //     return (
  //       <div className="layoutItem" key={l.i}>
  //         <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
  //       </div>
  //     )
  //   })
  // }

  render() {
    return (
      <div>
        {/* <div className="layoutJSON">
          Displayed as <code>[x, y, w, h]</code>:
          <div className="columns">{this.stringifyLayout()}</div>
        </div> */}

        {/* 이게 원래 있던거
        <ShowcaseLayout onLayoutChange={this.onLayoutChange} /> */}
        <ShowcaseLayout />
      </div>
    )
  }
}

export default ExampleLayout
