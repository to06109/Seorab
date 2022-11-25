import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)

const data = [
  {
    title: '골대의 저주',
    content: '저희 골키퍼 두명입니다.',
    link:
      'https://twitter.com/raei426/status/1595803975076306944?s=20&t=3GWrxlavnsidhlreBpzUaQ',
  },
  {
    title: '환율, 5원 가량 내리며...',
    content: '美국채 금리 하락폭 키우자 달러인덱스 하락',
    link:
      'https://finance.naver.com/news/news_read.naver?mode=mainnews&office_id=018&article_id=0005374962',
  },
  {
    title: '[칼럼] "난... 이런 거 싫어"',
    content: '게임에서 미소녀 캐릭터를 대하는 방법은 여러가지가 있습니다만',
    link:
      'https://m.post.naver.com/viewer/postView.naver?volumeNo=34792278&memberNo=11710666&vType=VERTICAL',
  },
  {
    title: 'UTMOST 애쉬다운 슬림핏 데님팬츠',
    content: '4 Size (히든밴딩/중청)',
    link:
      'https://realcoco.com/product/realprice15%EC%9E%AC%EC%A7%84%ED%96%89-utmost-%EC%95%A0%EC%89%AC%EB%8B%A4%EC%9A%B4-%EC%8A%AC%EB%A6%BC%ED%95%8F-%EB%8D%B0%EB%8B%98%ED%8C%AC%EC%B8%A0%EA%B8%B0%EB%AA%A8ver-4-size-%ED%9E%88%EB%93%A0%EB%B0%B4%EB%94%A9%EC%A4%91%EC%B2%AD/15343/category/958/display/1/',
  },
  {
    title: '목걸이 팔찌 모음 트랜드메카',
    content: '스와로브스키 선물 추천',
    link:
      'https://trendmecca.co.kr/product/%EC%8A%A4%EC%99%80%EB%A1%9C%EB%B8%8C%EC%8A%A4%ED%82%A4-%EC%84%A0%EB%AC%BC-%EC%B6%94%EC%B2%9C-%EB%AA%A9%EA%B1%B8%EC%9D%B4-%ED%8C%94%EC%B0%8C-%EB%AA%A8%EC%9D%8C-%ED%8A%B8%EB%9E%9C%EB%93%9C%EB%A9%94%EC%B9%B4/33889/category/3674/display/1/',
  },
]

export default class ShowcaseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // currentBreakpoint: 'lg',
      compactType: 'vertical',
      mounted: false,
      layouts: { lg: props.initialLayout },
    }

    // this.onBreakpointChange = this.onBreakpointChange.bind(this)
    // this.onCompactTypeChange = this.onCompactTypeChange.bind(this)
    // this.onLayoutChange = this.onLayoutChange.bind(this)
    // this.onNewLayout = this.onNewLayout.bind(this)
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function (l, i) {
      return (
        <div key={i} className="item_design">
          <span className="text">{i}</span>
          <h3>{data[i].title}</h3>
          <span>{data[i].content}</span>
          <a href={data[i].link}>링크</a>
        </div>
      )
    })
  }

  // onBreakpointChange(breakpoint) {
  //   this.setState({
  //     currentBreakpoint: breakpoint,
  //   })
  // }

  // onCompactTypeChange() {
  //   const { compactType: oldCompactType } = this.state
  //   const compactType =
  //     oldCompactType === 'horizontal'
  //       ? 'vertical'
  //       : oldCompactType === 'vertical'
  //       ? null
  //       : 'horizontal'
  //   this.setState({ compactType })
  // }

  // onLayoutChange(layout, layouts) {
  //   this.props.onLayoutChange(layout, layouts)
  // }

  // onNewLayout() {
  //   this.setState({
  //     layouts: { lg: generateLayout() },
  //   })
  // }

  render() {
    return (
      <div>
        {/* <div>
          Current Breakpoint: {this.state.currentBreakpoint} (
          {this.props.cols[this.state.currentBreakpoint]} columns)
        </div>
        <div>
          Compaction type:{' '}
          {_.capitalize(this.state.compactType) || 'No Compaction'}
        </div> */}
        {/* <button onClick={this.onNewLayout}>Generate New Layout</button> */}
        {/* <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button> */}
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          // onBreakpointChange={this.onBreakpointChange}
          // onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
}

ShowcaseLayout.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  // onLayoutChange: function () {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: generateLayout(),
}

// class="react-grid-item react-draggable cssTransforms react-resizable"
function generateLayout() {
  return _.map(_.range(0, data.length), function (item, i) {
    // var y = Math.ceil(Math.random() * 4) + 1
    return {
      // x: (_.random(0, 5) * 2) % 12,
      // y: Math.floor(i / 6) * y,
      x: (i * 2) % 12,
      y: i / 6,
      w: 2,
      h: 4,
      i: i.toString(),
      // static: Math.random() < 0.05,
    }
  })
}
