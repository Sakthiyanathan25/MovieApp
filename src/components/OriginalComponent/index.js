import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimpleSlider from '../SliderComponent'

const apiOriginalStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class OriginalsPage extends Component {
  state = {
    OriginalsList: [],
    apiOriginalStatus: apiOriginalStatusConstants.initial,
  }

  componentDidMount() {
    this.getRenderOriginalData()
  }

  getRenderOriginalData = async () => {
    this.setState({apiOriginalStatus: apiOriginalStatusConstants.inProgress})
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
      this.setState({
        apiOriginalStatus: apiOriginalStatusConstants.success,
        OriginalsList: updateData,
      })
    } else {
      this.setState({apiOriginalStatus: apiOriginalStatusConstants.failure})
    }
  }

  renderOriginalsView = () => {
    const {apiOriginalStatus} = this.state

    switch (apiOriginalStatus) {
      case apiOriginalStatusConstants.success:
        return this.successOriginalPage()

      case apiOriginalStatusConstants.failure:
        return this.failureOriginalPage()

      case apiOriginalStatusConstants.inProgress:
        return this.loaderOriginalPage()

      default:
        return null
    }
  }

  loaderOriginalPage = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureOriginalPage = () => (
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
          onClick={this.getRenderOriginalData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  successOriginalPage = () => {
    const {OriginalsList} = this.state
    return <SimpleSlider List={OriginalsList} />
  }

  render() {
    return (
      <>
        <h1 className="head">Originals</h1>
        {this.renderOriginalsView()}
      </>
    )
  }
}

export default OriginalsPage
