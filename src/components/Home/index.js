import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'
import Failure from '../Failure'

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
        coursesList: formattedData,
        isLoading: false,
      })
    } else {
      this.failureView()
    }
  }

  failureView = () => <Failure />

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourses = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1 className="heading ">Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachCourse => (
            <CourseItem key={eachCourse.id} coursesDetails={eachCourse} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className="app-container">
          {isLoading ? this.renderLoader() : this.renderCourses()}
        </div>
      </>
    )
  }
}

export default Home
