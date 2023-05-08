import {withRouter} from 'react-router-dom'
import './index.css'

const Failure = props => {
  const goHome = () => {
    const {history} = props
    history.replace('/Home')
  }

  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="heading-two">Oops! Something Went Wrong</h1>
      <p className="text">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="button" onClick={goHome}>
        Retry
      </button>
    </div>
  )
}
export default withRouter(Failure)
