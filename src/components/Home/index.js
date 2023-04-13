import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    coursesList: [],
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()

    const formattedData = data.courses.map(eachObject => ({
      id: eachObject.id,
      name: eachObject.name,
      logoUrl: eachObject.logo_url,
    }))

    if (response.ok === true) {
      this.setState({
        isLoading: false,
        coursesList: formattedData,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  )

  renderCoursesList = () => {
    const {coursesList} = this.state
    return (
      <ul className="courses-container">
        {coursesList.map(eachCourse => (
          <CourseItem key={eachCourse.id} coursesDetails={eachCourse} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Courses</h1>
        {isLoading ? this.renderLoader() : this.renderCoursesList()}
      </div>
    )
  }
}

export default Home
