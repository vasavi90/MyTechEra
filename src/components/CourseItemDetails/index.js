import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Failure from '../Failure'

import './index.css'

class CourseItemDetails extends Component {
  state = {
    isLoading: true,
    courseObject: {},
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

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
        isLoading: false,
        courseObject: updatedData,
      })
    } else {
      this.failureView()
    }
  }

  failureView = () => <Failure />

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseDetails = () => {
    const {courseObject} = this.state
    const {courseDetails} = courseObject
    const {name, imageUrl, description} = courseDetails

    return (
      <div className="details-container">
        <img src={imageUrl} alt={name} className="image" />
        <div className="text-container">
          <h1 className="heading">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="container">
        {isLoading ? this.renderLoader() : this.renderCourseDetails()}
      </div>
    )
  }
}

export default CourseItemDetails
