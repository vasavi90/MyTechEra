import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseObject: {},
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()

    const updatedData = {
      courseDetails: {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      },
    }

    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        courseObject: updatedData,
      })
    }

    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  goHome = () => {
    const {history} = this.props
    history.replace('/Home')
  }

  renderFailureView = () => (
    <div className="container">
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
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseView = () => {
    const {courseObject} = this.state
    const {courseDetails} = courseObject
    const {name, imageUrl, description} = courseDetails

    return (
      <div className="app-container">
        <div className="details-container">
          <img src={imageUrl} alt={name} className="image" />
          <div className="text-container">
            <h1 className="heading">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default CourseItemDetails
