import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coursesList: [],
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()

    const formattedData = data.courses.map(eachObject => ({
      id: eachObject.id,
      name: eachObject.name,
      logoUrl: eachObject.logo_url,
    }))

    if (response.ok === true) {
      this.setState({
        coursesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCoursesView = () => {
    const {coursesList} = this.state

    return (
      <div className="app-container">
        <h1 className="heading ">Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachCourse => (
            <CourseItem key={eachCourse.id} coursesDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  goHome = () => {
    const {history} = this.props
    history.replace('/Home')
  }

  renderFailureView = () => (
    <div className="app-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="heading-two">Oops! Something Went Wrong</h1>
      <p className="text">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="button" onClick={this.goHome}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="app-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Home
