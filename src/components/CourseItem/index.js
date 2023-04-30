import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {coursesDetails} = props
  const {id, name, logoUrl} = coursesDetails

  return (
    <li>
      <Link to={`/courses/${id}`} className="link">
        <img src={logoUrl} alt={name} className="image" />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseItem
