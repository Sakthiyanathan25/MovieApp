import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimpleSlider from '../SliderComponent'

const apiTrendingStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingPage extends Component {
  state = {
    TrendingList: [],
    apiTrendingStatus: apiTrendingStatusConstants.initial,
  }

  componentDidMount() {
    this.getRenderData()
  }

  getRenderData = async () => {
    this.setState({apiTrendingStatus: apiTrendingStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      const updateData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
      }))
      this.setState({
        apiTrendingStatus: apiTrendingStatusConstants.success,
        TrendingList: updateData,
      })
    } else {
      this.setState({apiTrendingStatus: apiTrendingStatusConstants.failure})
    }
  }

  renderTrendingView = () => {
    const {apiTrendingStatus} = this.state

    switch (apiTrendingStatus) {
      case apiTrendingStatusConstants.success:
        return this.successPage()

      case apiTrendingStatusConstants.failure:
        return this.failurePage()

      case apiTrendingStatusConstants.inProgress:
        return this.loaderPage()

      default:
        return null
    }
  }

  loaderPage = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failurePage = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670040709/Movies%20App/alert-triangle_sc1zom.png"
        alt="failure view"
        className="failureImage"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getRenderData()}>
        Try Again
      </button>
    </div>
  )

  successPage = () => {
    const {TrendingList} = this.state
    return <SimpleSlider List={TrendingList} />
  }

  render() {
    return <>{this.renderTrendingView()}</>
  }
}

export default TrendingPage
