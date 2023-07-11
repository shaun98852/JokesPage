import {Component} from 'react'
import MovingText from 'react-moving-text'
import Popup from 'reactjs-popup'
import {ThreeDots} from 'react-loader-spinner'
import {MdOutlineClose} from 'react-icons/md'

import './index.css'

class AnimalJokesPage extends Component {
  state = {
    jokeCategories: [],
    selectedCategory: '',
    currentJoke: '',
    showLoaderOrNot: true,
  }

  componentDidMount() {
    this.jokesCategories()
  }

  categorySet = category => {
    const requiredCategory = category[0].toUpperCase() + category.slice(1)
    this.setState({selectedCategory: requiredCategory}, this.getJoke)
  }

  setCategoryEmpty = () => {
    this.setState({selectedCategory: ''})
  }

  jokesCategories = async () => {
    const details = await fetch('https://api.chucknorris.io/jokes/categories')

    const finalDetails = await details.json()
    if (details.ok === true) {
      this.setState({jokeCategories: finalDetails})
    }
  }

  getJoke = async () => {
    const {selectedCategory} = this.state
    this.setState({showLoaderOrNot: true})
    const setCategory =
      selectedCategory[0].toLowerCase() + selectedCategory.slice(1)
    const joke = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${setCategory}`,
    )
    const jokeDetails = await joke.json()
    const {value} = jokeDetails
    if (joke.ok === true) {
      this.setState({currentJoke: value, showLoaderOrNot: false})
    }
  }

  ListItems = () => {
    const {
      jokeCategories,
      selectedCategory,
      currentJoke,
      showLoaderOrNot,
    } = this.state

    return (
      <div className="listItems">
        <ul className="ulList">
          {jokeCategories.map(eachItem => {
            const finalText = eachItem[0].toUpperCase() + eachItem.slice(1)
            const requiredContainer =
              finalText === selectedCategory ? 'selectedContainer' : 'container'
            return (
              <div className="popup" key={jokeCategories.indexOf(eachItem)}>
                <Popup
                  modal
                  onOpen={() => this.categorySet(eachItem)}
                  trigger={
                    <li className={requiredContainer}>
                      <h1 className="animalHeading">{finalText}</h1>
                      <p className="eachPara">Unlimited Jokes on Animal</p>
                    </li>
                  }
                >
                  {close => (
                    <div className="popupContainer">
                      <div className="topContainer">
                        <h1 className="category">{selectedCategory}</h1>
                        <div
                          className="crossBox"
                          onClick={this.setCategoryEmpty}
                        >
                          <MdOutlineClose
                            onClick={() => close()}
                            className="crossStyle"
                          />
                        </div>
                      </div>

                      <div className="jokeBox">
                        {showLoaderOrNot ? (
                          <div className="loaderProperties">
                            <ThreeDots
                              height="80"
                              width="80"
                              radius="9"
                              color="#4fa94d"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClassName=""
                              visible={true}
                            />
                          </div>
                        ) : (
                          <h1 className="joke">{`"${currentJoke}"`}</h1>
                        )}

                        <button
                          className="refreshButton"
                          type="button"
                          onClick={this.getJoke}
                        >
                          Next Joke
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="background">
        <h1 className="heading">
          <MovingText
            type="shakeVertical"
            duration="6000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="infinite"
            fillMode="none"
          >
            Chuck Norries
          </MovingText>
        </h1>

        {this.ListItems()}
      </div>
    )
  }
}

export default AnimalJokesPage
