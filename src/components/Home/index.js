import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaPlay} from 'react-icons/fa'
import Header from '../HeaderComponent'
import TrendingPage from '../TrendingComponent'
import OriginalsPage from '../OriginalComponent'
import TopRatedPage from '../TopRatedComponent'
import Footer from '../FooterComponent'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    FirstMovie: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRenderHomeData()
  }

  getRenderHomeData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
      const randomNumber = Math.floor(Math.random() * (updateData.length - 1))
      const selectMovie = updateData[randomNumber]
      this.setState({
        apiStatus: apiStatusConstants.success,
        FirstMovie: selectMovie,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  loaderHomePage = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureHomePage = () => (
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
          onClick={this.getRenderHomeData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  successHomePage = () => {
    const {FirstMovie} = this.state
    const {backdropPath, overview, title} = FirstMovie

    return (
      <div
        style={{backgroundImage: `url(${backdropPath})`}}
        className="poster-container"
      >
        <Header />
        <div className="MovieHeadingContainer">
          <h1 className="heading">{title}</h1>
          <p className="description">{overview}</p>
          <button className="playButton" type="button">
            <span>
              <FaPlay />
            </span>
            Play
          </button>
        </div>
      </div>
    )
  }

  renderPosterView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successHomePage()

      case apiStatusConstants.failure:
        return this.failureHomePage()

      case apiStatusConstants.inProgress:
        return this.loaderHomePage()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="HomePageContainer">
        {this.renderPosterView()}
        <TrendingPage />
        <TopRatedPage />
        <OriginalsPage />
        <Footer />
      </div>
    )
  }
}
export default Home
