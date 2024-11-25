import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {HiExternalLink} from 'react-icons/hi'
import './index.css'
import Header from '../Header'
import FooterContact from '../FooterContact'

const apiStatusConstants = {
  success: 'SUCCESS',
  initail: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsObject: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initail,
  }

  componentDidMount() {
    this.getJobDetailsObject()
  }

  onRetry = () => {
    this.getJobDetailsObject()
  }

  getJobDetailsObject = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const detailsObj = data.job_details
      const updatedData = {
        companyLogoUrl: detailsObj.company_logo_url,
        companyWebsiteUrl: detailsObj.company_website_url,
        employmentType: detailsObj.employment_type,
        id: detailsObj.id,
        jobDescription: detailsObj.job_description,
        skills: detailsObj.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: detailsObj.life_at_company.description,
          imageUrl: detailsObj.life_at_company.image_url,
        },
        location: detailsObj.location,
        packagePerAnnum: detailsObj.package_per_annum,
        rating: detailsObj.rating,
        title: detailsObj.title,
      }

      const similarJobsList = data.similar_jobs
      const updatedSimilarJobsList = similarJobsList.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetailsObject: updatedData,
        similarJobs: updatedSimilarJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-con">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="fil-paraa">
        We cannot seem to find the page you are looking for
      </p>
      <button className="btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessObject = () => {
    const {jobDetailsObject, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobDetailsObject

    return (
      <div className="details-bg-container">
        <div className="list-container">
          <div className="top-cont">
            <img
              className="comp-logo"
              alt="job details company logo"
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
              <p className="p">{employmentType}</p>
            </div>
            <p className="title">{packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <div className="desc-conm">
            <h1 className="desc-heading">Description</h1>
            <a target="blank" href={companyWebsiteUrl} className="visit">
              Visit <HiExternalLink className="visit-ligo" />
            </a>
          </div>

          <p className="description">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="desc-heading">Skills</h1>
            <ul className="ul">
              {skills.map(eachskill => (
                <li key={eachskill.name} className="skill-list">
                  <div className="list-co">
                    <img
                      src={eachskill.imageUrl}
                      className="img-class"
                      alt={eachskill.name}
                    />
                    <p className="skill-name">{eachskill.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-container">
            <h1 className="desc-heading">Life at Company</h1>
            <div className="life-cont">
              <p className="description">{lifeAtCompany.description}</p>
              <img
                className="life-img"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="simil-desc-heading">Similar Jobs</h1>
        <ul className="simi-ul-cont">
          {similarJobs.map(each => (
            <li key={each.id} className="lists">
              <div className="lists-con">
                <div className="top-cont">
                  <img
                    className="similar-comp-logo"
                    alt="similar job company logo"
                    src={each.companyLogoUrl}
                  />
                  <div>
                    <h1 className="stitle">{each.title}</h1>
                    <div className="rateing-cont">
                      <AiFillStar className="star" />
                      <p className="rating-num">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="similar-desc">Description</h1>
                <p className="similar-description">{each.jobDescription}</p>
                <div className="line">
                  <div className="line-sub">
                    <MdLocationOn className="line-icon" />
                    <p className="similar-description">{each.location}</p>
                    <BsBriefcaseFill className="line-icon" />
                    <p className="similar-description">{each.employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderObject = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessObject()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-job-details-container">
        <Header />
        {this.renderObject()}
        <FooterContact />
      </div>
    )
  }
}

export default JobItemDetails
