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

    this.setState({
      coursesList: formattedData,
      isLoading: false,
    })
  }

  render() {
    const {coursesList, isLoading} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Courses</h1>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul>
            {coursesList.map(eachCourse => (
              <CourseItem key={eachCourse.id} coursesDetails={eachCourse} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
