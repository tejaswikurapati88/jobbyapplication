import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import JobItem from '../JobItem'
import './index.css'
import Header from '../Header'
import FooterContact from '../FooterContact'

const apiStatusConstantsProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
const apiStatusConstantsJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = [
  {
    label: 'Hyderabad',
    locationId: 'HYD',
  },
  {
    label: 'Bangalore',
    locationId: 'BAN',
  },
  {
    label: 'Chennai',
    locationId: 'CHE',
  },
  {
    label: 'Delhi',
    locationId: 'DEL',
  },
  {
    label: 'Mumbai',
    locationId: 'MUM',
  },
]

class Jobs extends Component {
  state = {
    searchInp: '',
    profileData: {},
    apiStatusProfile: apiStatusConstantsProfile.initial,
    apiStatusJobs: apiStatusConstantsJobs.initial,
    jobsList: [],
    activeEmplymentValue: [],
    activeLocation: [],
    activeSalaryRangeValue: 0,
    isfixSticky: false,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsDetails()
  }

  getProfileData = async () => {
    this.setState({apiStatusProfile: apiStatusConstantsProfile.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const proData = data.profile_details
      const formattedProfileData = {
        name: proData.name,
        profileImageUrl: proData.profile_image_url,
        shortBio: proData.short_bio,
      }
      this.setState({
        profileData: formattedProfileData,
        apiStatusProfile: apiStatusConstantsProfile.success,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstantsProfile.failure})
    }
  }

  getJobsDetails = async () => {
    const {
      activeEmplymentValue,
      activeSalaryRangeValue,
      activeLocation,
      searchInp,
    } = this.state
    this.setState({apiStatusJobs: apiStatusConstantsJobs.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmplymentValue.join(
      ',',
    )}&minimum_package=${activeSalaryRangeValue}&search=${searchInp}&locations=${activeLocation.join(
      ',',
    )}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const datadat = data.jobs
      const updatedData = datadat.map(eachjob => ({
        companyLogoUrl: eachjob.company_logo_url,
        employementType: eachjob.employment_type,
        id: eachjob.id,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        packagePerAnnum: eachjob.package_per_annum,
        rating: eachjob.rating,
        title: eachjob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatusJobs: apiStatusConstantsJobs.success,
      })
    } else {
      this.setState({apiStatusJobs: apiStatusConstantsJobs.failure})
    }
  }

  fixSticky = () => {
    if (window.scrollY >= 220) {
      this.setState({isfixSticky: true})
    } else {
      this.setState({isfixSticky: false})
    }
  }

  onSearch = event => {
    this.setState({searchInp: event.target.value})
  }

  onRetry = () => {
    this.getProfileData()
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {profileImageUrl, shortBio} = profileData
    return (
      <div className="bg-profile-cont">
        <img className="profile-pic" src={profileImageUrl} alt="profile" />
        <h1 className="name">Tejaswi Kurapati</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="profile-failure-cont">
      <button onClick={this.onRetry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderProfileContent = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStatusConstantsProfile.success:
        return this.renderProfile()
      case apiStatusConstantsProfile.inProgress:
        return this.renderProfileLoader()
      case apiStatusConstantsProfile.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  renderList = () => {
    const {jobsList} = this.state
    console.log(jobsList)
    const jobsListLength = jobsList.length
    window.addEventListener('scroll', this.fixSticky)
    return (
      <>
        {jobsListLength > 0 ? (
          <ul className="ul">
            {jobsList.map(eachJob => (
              <JobItem jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          <div className="jobs-failure">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              className="no-jobs-img"
              alt="no jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderProfileLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobs-failure-button"
        onClick={this.getJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {apiStatusJobs} = this.state
    switch (apiStatusJobs) {
      case apiStatusConstantsJobs.success:
        return this.renderList()
      case apiStatusConstantsJobs.inProgress:
        return this.renderLoader()
      case apiStatusConstantsJobs.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  onEmployeType = event => {
    this.setState(
      prevState => ({
        activeEmplymentValue: [
          ...prevState.activeEmplymentValue,
          event.target.value,
        ],
      }),
      this.getJobsDetails,
    )
  }

  changeLocation = event => {
    const {activeLocation} = this.state
    this.setState(
      prevState => ({
        activeLocation: [...prevState.activeLocation, event],
      }),
      this.getJobsDetails,
    )
    console.log(activeLocation)
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  onSearchClick = () => {
    this.getJobsDetails()
  }

  changeSalaryRange = id => {
    this.setState({activeSalaryRangeValue: id}, this.getJobsDetails)
  }

  render() {
    const {searchInp, isfixSticky} = this.state

    return (
      <div>
        <Header />
        <div className="jobs-bg-container">
          <div className="left-cont">
            {this.renderProfileContent()}
            <div className={isfixSticky ? 'left-cont fixed' : 'left-cont'}>
              <hr className="hr" />
              <div className="con">
                <h1 className="filter-heading">Type of Employment</h1>
                <ul className="filter-ul-container">
                  {employmentTypesList.map(each => (
                    <li
                      key={each.employmentTypeId}
                      className="li-filter"
                      onChange={this.onEmployeType}
                    >
                      <input
                        className="filter-inp"
                        type="checkbox"
                        value={each.employmentTypeId}
                        id={each.employmentTypeId}
                      />
                      <label
                        className="filter-label"
                        htmlFor={each.employmentTypeId}
                      >
                        {each.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="hr" />
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="filter-ul-container">
                {salaryRangesList.map(eachSalary => {
                  const onChangeSalary = () =>
                    this.changeSalaryRange(eachSalary.salaryRangeId)

                  return (
                    <li
                      key={eachSalary.salaryRangeId}
                      className="li-filter"
                      onChange={onChangeSalary}
                    >
                      <input
                        className="filter-input"
                        type="radio"
                        name="salary"
                        id={eachSalary.salaryRangeId}
                      />
                      <label
                        className="filter-label"
                        htmlFor={eachSalary.salaryRangeId}
                      >
                        {eachSalary.label}
                      </label>
                    </li>
                  )
                })}
              </ul>
              <hr className="hr" />
              <h1 className="filter-heading">Locations</h1>
              <ul className="filter-ul-container">
                {locationsList.map(eachlocation => {
                  const onLocation = () =>
                    this.changeLocation(eachlocation.label)
                  return (
                    <li
                      key={eachlocation.locationId}
                      className="li-filter"
                      onChange={onLocation}
                    >
                      <input
                        type="checkbox"
                        value={eachlocation.locationId}
                        className="filter-inp"
                        id={eachlocation.locationId}
                      />
                      <label
                        className="filter-label"
                        htmlFor={eachlocation.locationId}
                      >
                        {eachlocation.label}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div
            className={isfixSticky ? 'jobs-container margin' : 'jobs-container'}
          >
            <div className="searchbar">
              <input
                type="search"
                className="search-inp"
                placeholder="Search"
                value={searchInp}
                onChange={this.onSearch}
              />
              <button
                className="search-button"
                data-testid="searchButton"
                onClick={this.onSearchClick}
                type="button"
              >
                .
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
        <FooterContact />
      </div>
    )
  }
}
export default Jobs
