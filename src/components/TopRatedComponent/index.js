import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimpleSlider from '../SliderComponent'

const apiTopRatedStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedPage extends Component {
  state = {
    TopRatedList: [],
    apiTopRatedStatus: apiTopRatedStatusConstants.initial,
  }

  componentDidMount() {
    this.getRenderTopRatedData()
  }

  getRenderTopRatedData = async () => {
    this.setState({apiTopRatedStatus: apiTopRatedStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        apiTopRatedStatus: apiTopRatedStatusConstants.success,
        TopRatedList: updateData,
      })
    } else {
      this.setState({apiTopRatedStatus: apiTopRatedStatusConstants.failure})
    }
  }

  renderTopRatedView = () => {
    const {apiTopRatedStatus} = this.state

    switch (apiTopRatedStatus) {
      case apiTopRatedStatusConstants.success:
        return this.successTopRatedPage()

      case apiTopRatedStatusConstants.failure:
        return this.failureTopRatedPage()

      case apiTopRatedStatusConstants.inProgress:
        return this.loaderTopRatedPage()

      default:
        return null
    }
  }

  loaderTopRatedPage = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureTopRatedPage = () => (
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
          onClick={this.getRenderTopRatedData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  successTopRatedPage = () => {
    const {TopRatedList} = this.state
    return <SimpleSlider List={TopRatedList} />
  }

  render() {
    return (
      <>
        <h1 className="head">Top Rated</h1>
        {this.renderTopRatedView()}
      </>
    )
  }
}

export default TopRatedPage
