import './index.css'
import {Component} from 'react'

class CoinToss extends Component {
  state = {
    result: 0,
    count: 0,
    headsCount: 0,
    isSpinning: false,
    heads: true,
    dark: false,
    hasChosen: false,
    userChoice: '',
  }

  toss = () => {
    this.setState({isSpinning: true})

    setTimeout(() => {
      const result = Math.floor(Math.random() * 2)
      this.setState(prev => ({
        result,
        count: prev.count + 1,
        headsCount: result === 0 ? prev.headsCount + 1 : prev.headsCount,
        isSpinning: false,
        heads: result === 0,
      }))
    }, 700)
  }

  reset = () => {
    this.setState(prev => ({
      result: 0,
      count: 0,
      headsCount: 0,
      isSpinning: false,
      heads: true,
      dark: prev.dark,
      hasChosen: false,
      userChoice: '',
    }))
  }

  switch = () => {
    this.setState(prev => ({dark: !prev.dark}))
  }

  choseHeads = () => {
    this.setState({userChoice: 'heads', hasChosen: true})
  }

  choseTails = () => {
    this.setState({userChoice: 'tails', hasChosen: true})
  }

  render() {
    const {
      result,
      count,
      headsCount,
      isSpinning,
      heads,
      dark,
      userChoice,
      hasChosen,
    } = this.state

    const link =
      result === 0
        ? 'https://assets.ccbp.in/frontend/react-js/heads-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/tails-img.png'

    let paraColor = 'yellow'
    if (hasChosen && count > 0) {
      const currentResult = heads ? 'heads' : 'tails'
      paraColor = userChoice === currentResult ? 'green' : 'red'
    }

    let message
    if (count > 0) {
      message = heads ? 'Heads' : 'Tails'
    } else if (hasChosen) {
      message = `Let's spin for ${userChoice}!`
    } else {
      message = (
        <div className="buttonCont">
          <p>
            <button
              type="button"
              className={dark ? 'secButtonDark' : 'secButtonLight'}
              onClick={this.choseHeads}
            >
              Heads
            </button>{' '}
            <button
              type="button"
              className={dark ? 'secButtonDark' : 'secButtonLight'}
              onClick={this.choseTails}
            >
              Tails
            </button>
          </p>
        </div>
      )
    }

    let headsClass = ''
    if (hasChosen) {
      if (userChoice === 'heads') {
        headsClass = 'green'
      } else {
        headsClass = 'red'
      }
    }

    let tailsClass = ''
    if (hasChosen) {
      if (userChoice === 'tails') {
        tailsClass = 'green'
      } else {
        tailsClass = 'red'
      }
    }

    return (
      <div className={`${dark ? 'ultraDark' : 'mainContainer'}`}>
        <div className={`subContainer ${dark ? 'dark' : ''}`}>
          <img
            src={
              dark
                ? 'https://assets.ccbp.in/frontend/react-js/tails-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/heads-img.png'
            }
            className="darkModeToggle"
            onClick={this.switch}
            alt="toggle theme"
          />
          <h1 className={`${dark ? 'white' : ''}`}>Coin Toss Game</h1>

          <div className="midContainer">
            {hasChosen && (
              <p className={`${dark ? 'chooseTextDark' : 'chooseText'}`}>
                You have chosen <span className="bold">{userChoice}</span>...
              </p>
            )}
            <p className={`paraCont ${paraColor}`}>{message}</p>
          </div>

          <div className="imgC">
            <img
              src={link}
              alt="toss result"
              className={`img ${isSpinning ? 'spin' : ''}`}
            />
          </div>

          <div className="buttonContainer">
            {(hasChosen || count > 0) && (
              <button type="button" onClick={this.reset} className="secButton">
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={this.toss}
              disabled={isSpinning}
              className={`${dark ? 'darkButton' : 'normalButton'} ${
                isSpinning ? 'disabledButton' : ''
              }`}
            >
              Toss Coin
            </button>
          </div>

          <p className={`${dark ? 'white' : ''}`}>
            Tossed: <span className="yellow">{count}</span>
            {count === 1 ? ' Time' : ' Times'}
          </p>

          <div className="details">
            <p className={`${dark ? 'white' : ''}`}>
              Heads: <span className={headsClass}>{headsCount}</span>
            </p>
            <p className={`${dark ? 'white' : ''}`}>
              Tails: <span className={tailsClass}>{count - headsCount}</span>
            </p>
          </div>

          <h1 className="bottomText">By Akilesh</h1>
        </div>
      </div>
    )
  }
}

export default CoinToss
