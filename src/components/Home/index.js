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
    this.getRenderData()
  }

  getRenderData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
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
      <button type="button" onClick={this.getRenderData}>
        Try Again
      </button>
    </div>
  )

  successPage = () => {
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
            <p>
              <FaPlay />
            </p>
            <p>Play</p>
          </button>
        </div>
      </div>
    )
  }

  renderPosterView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successPage()

      case apiStatusConstants.failure:
        return this.failurePage()

      case apiStatusConstants.inProgress:
        return this.loaderPage()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="HomePageContainer">
        {this.renderPosterView()}
        <h1 className="head">TRENDING NOW</h1>
        <TrendingPage />
        <h1 className="head">TOP RATED</h1>
        <TopRatedPage />
        <h1 className="head">ORIGINALS</h1>
        <OriginalsPage />
        <Footer />
      </div>
    )
  }
}
export default Home
