import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../HeaderComponent'
import './index.css'

const apiPopularStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularList: [],
    apiPopularStatus: apiPopularStatusConstants.initial,
  }

  componentDidMount() {
    this.getRenderData()
  }

  getRenderData = async () => {
    this.setState({apiPopularStatus: apiPopularStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        apiPopularStatus: apiPopularStatusConstants.success,
        popularList: updateData,
      })
    } else {
      this.setState({apiPopularStatus: apiPopularStatusConstants.failure})
    }
  }

  renderPopularView = () => {
    const {apiPopularStatus} = this.state

    switch (apiPopularStatus) {
      case apiPopularStatusConstants.success:
        return this.successPage()

      case apiPopularStatusConstants.failure:
        return this.failurePage()

      case apiPopularStatusConstants.inProgress:
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
    const {popularList} = this.state
    return (
      <div>
        <ul className="MovieOrderContainer">
          {popularList.map(eachMovie => (
            <li className="EachPopularMovies">
              {' '}
              <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
                <div className="MovieItems">
                  <img
                    className="images"
                    src={eachMovie.posterPath}
                    alt={eachMovie.title}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        {this.renderPopularView()}
      </div>
    )
  }
}

export default Popular
