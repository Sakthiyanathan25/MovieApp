import {Component} from 'react'
import {BiSearch} from 'react-icons/bi'
import {RiMenuFoldFill} from 'react-icons/ri'
import {ImCancelCircle} from 'react-icons/im'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {isSearchBarPresent: false, menuBarClick: false}

  searchBar = () => {
    this.setState({isSearchBarPresent: true})
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
    const {isSearchBarPresent, menuBarClick} = this.state

    return (
      <nav className="NavContainer">
        <div className="home-container">
          <div className="NavLogo">
            <Link to="/">                                          
              <img
                className="logo"
                src="https://res.cloudinary.com/dn0evywtq/image/upload/v1694616864/qyinbzpzwcfmbtg97nsl.png"
                alt="logo"
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
            {!isSearchBarPresent ? (
              <Link to="/search">
                <button
                  type="button"
                  onClick={this.searchBar}
                  className="searchIcon"
                  testid="searchButton"
                >
                  <BiSearch className="searchBar" />
                </button>
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
                  <BiSearch className="searchBar" />
                </div>
              </div>
            )}
          </div>
          <div>
            <Link to="/account">
              <img
                className="avatar"
                src="https://res.cloudinary.com/dn0evywtq/image/upload/v1694677282/Avatar_ocxtys.png"
                alt="avatar"
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

export default Header
