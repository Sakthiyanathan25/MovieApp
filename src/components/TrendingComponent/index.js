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
    this.getRenderTrendingData()
  }

  getRenderTrendingData = async () => {
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
    if (response.ok === true) {
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
        return this.successTrendingPage()

      case apiTrendingStatusConstants.failure:
        return this.failureTrendingPage()

      case apiTrendingStatusConstants.inProgress:
        return this.loaderTrendingPage()

      default:
        return null
    }
  }

  loaderTrendingPage = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureTrendingPage = () => (
    <div className="error-page-container">
      <div className="thumbnail-error-page">
        <img
          className="thumbnail-warning-icon"
          alt="failure view"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
        />
        <p className="thumbnail-error-msg">
          Something went wrong. Please try again
        </p>
        <button
          onClick={this.getRenderTrendingData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  successTrendingPage = () => {
    const {TrendingList} = this.state
    return <SimpleSlider List={TrendingList} />
  }

  render() {
    return (
      <>
        <h1 className="head">Trending Now</h1>
        {this.renderTrendingView()}
      </>
    )
  }
}

export default TrendingPage
