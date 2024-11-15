import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <li className="li">
      <Link className="Link" to={`/jobs/${id}`}>
        <div className="list-container">
          <div className="top-cont">
            <img
              className="comp-logo"
              alt="company logo"
              src={companyLogoUrl}
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="rateing-cont">
                <AiFillStar className="star" />
                <p className="rating-num">{rating}</p>
              </div>
            </div>
          </div>
          <div className="line">
            <div className="line-sub">
              <MdLocationOn className="line-icon" />
              <p className="p">{location}</p>
              <BsBriefcaseFill className="line-icon" />
              <p className="p">{employementType}</p>
            </div>
            <p className="title">{packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <h1 className="title">Description</h1>
          <p className="desc">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
