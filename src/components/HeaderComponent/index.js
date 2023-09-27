import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiMenuFoldFill} from 'react-icons/ri'
import {ImCancelCircle} from 'react-icons/im'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {isSearchPathPresent: false, menuBarClick: false}

  componentDidMount() {
    this.isSearBar()
  }

  isSearBar = () => {
    const {match} = this.props
    const {path} = match
    if (path === '/search') {
      this.setState(p => ({isSearchPathPresent: !p.isSearchPathPresent}))
    }
  }

  menuBar = () => {
    this.setState(p => ({menuBarClick: !p.menuBarClick}))
  }

  CancelMenu = () => {
    this.setState({menuBarClick: false})
  }

  onChangeSearchInput = event => {
    const {changeSearchInput, getSearchData} = this.props
    changeSearchInput(event.target.value)

    getSearchData()
  }

  onKeyDownEnter = event => {
    const {getSearchData} = this.props
    if (event.key === 'Enter') {
      getSearchData()
    }
  }

  render() {
    const {isSearchPathPresent, menuBarClick} = this.state

    return (
      <nav className="NavContainer">
        <div className="home-container">
          <div className="NavLogo">
            <Link to="/">
              <img
                className="logo"
                src="https://res.cloudinary.com/dn0evywtq/image/upload/v1694616864/qyinbzpzwcfmbtg97nsl.png"
                alt="website logo"
              />
            </Link>
          </div>

          <ul className="ListContainer-home">
            <Link to="/">
              <li className="ListItems-home">Home</li>
            </Link>

            <Link to="/popular">
              <li className="ListItems-home">Popular</li>
            </Link>
          </ul>
          <div className="searchContainer">
            {!isSearchPathPresent ? (
              <Link to="/search">
                <button
                  type="button"
                  onClick={this.isSearch}
                  className="searchIcon"
                  testid="searchButton"
                >
                  <HiOutlineSearch className="searchBar" />
                </button>{' '}
              </Link>
            ) : (
              <div className="searchInputContainer">
                <input
                  type="search"
                  placeholder="Search"
                  className="InputSearchContainer"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDownEnter}
                />
                <div className="InputSearchBar">
                  <HiOutlineSearch className="searchBar" />
                </div>
              </div>
            )}
          </div>
          <div>
            <Link to="/account">
              <img
                className="avatar"
                src="https://res.cloudinary.com/dn0evywtq/image/upload/v1694677282/Avatar_ocxtys.png"
                alt="profile"
              />
            </Link>
          </div>
          <button
            type="button"
            onClick={this.menuBar}
            className="hamburgerMenu"
          >
            <RiMenuFoldFill className="menuBar" />
          </button>
        </div>

        {menuBarClick && (
          <ul className="MenuListContainer">
            <Link to="/">
              <li className="ListItems-home">Home</li>
            </Link>

            <Link to="/popular">
              <li className="ListItems-home">Popular</li>
            </Link>
            <Link to="/account">
              <li className="ListItems-home">Account</li>
            </Link>

            <li onClick={this.CancelMenu}>
              <ImCancelCircle />
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
