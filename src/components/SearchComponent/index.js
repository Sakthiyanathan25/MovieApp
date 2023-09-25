import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../HeaderComponent'
import './index.css'
import Footer from '../FooterComponent'

const apiSearchStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noResult: 'No_RESULT',
}

class Search extends Component {
  state = {
    SearchList: [],
    apiSearchStatus: apiSearchStatusConstants.initial,
    SearchInput: '',
  }

  // eslint-disable-next-line react/sort-comp
  changeSearchInput = value => {
    this.setState({SearchInput: value})
  }

  componentDidMount() {
    this.getSearchData()
  }

  getSearchData = async () => {
    const {SearchInput} = this.state

    this.setState({apiSearchStatus: apiSearchStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${SearchInput}`
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
      if (updateData.length === 0) {
        this.setState({apiSearchStatus: apiSearchStatusConstants.noResult})
      } else {
        this.setState({
          apiSearchStatus: apiSearchStatusConstants.success,
          SearchList: updateData,
        })
      }
    } else {
      this.setState({apiSearchStatus: apiSearchStatusConstants.failure})
    }
  }

  renderSearchView = () => {
    const {apiSearchStatus} = this.state

    switch (apiSearchStatus) {
      case apiSearchStatusConstants.success:
        return this.successSearchPage()

      case apiSearchStatusConstants.noResult:
        return this.noResultSearchPage()

      case apiSearchStatusConstants.failure:
        return this.failureSearchPage()

      case apiSearchStatusConstants.inProgress:
        return this.loaderSearchPage()

      default:
        return null
    }
  }

  noResultSearchPage = () => {
    const {SearchInput} = this.state

    return (
      <div className="no-result-view-container">
        <img
          src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1670000784/Movies%20App/Not_Found_qfz2oz.png"
          alt="no movies"
          className="no-result-image"
        />
        <p className="no-result-text">
          {`
          Your search for ${SearchInput} did not find any matches.`}
        </p>
      </div>
    )
  }

  loaderSearchPage = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  failureSearchPage = () => (
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
          onClick={this.getSearchData}
          className="thumbnail-try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  successSearchPage = () => {
    const {SearchList} = this.state
    return (
      <div>
        <ul className="MovieOrderContainer">
          {SearchList.map(eachMovie => (
            <li className="EachSearchMovies">
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
      <div className="search-container">
        <Header
          changeSearchInput={this.changeSearchInput}
          getSearchData={this.getSearchData}
        />
        {this.renderSearchView()}
        <Footer />
      </div>
    )
  }
}

export default Search
