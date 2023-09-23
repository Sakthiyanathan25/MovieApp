import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../HeaderComponent'
import './index.css'

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
    if (response.ok) {
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
        return this.successPage()

      case apiSearchStatusConstants.noResult:
        return this.noResultPage()

      case apiSearchStatusConstants.failure:
        return this.failurePage()

      case apiSearchStatusConstants.inProgress:
        return this.loaderPage()

      default:
        return null
    }
  }

  noResultPage = () => {
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
      <button type="button" onClick={this.getSearchData()}>
        Try Again
      </button>
    </div>
  )

  successPage = () => {
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
      </div>
    )
  }
}

export default Search
