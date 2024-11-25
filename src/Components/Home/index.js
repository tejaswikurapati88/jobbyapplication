import './index.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import Header from '../Header'
import FooterContact from '../FooterContact'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div className="bg-home-container">
        <Header />
        <div className="home-container">
          <div className="home-cont">
            <h1 className="home-main-heading">
              Find The Job That
              <br /> Fits Your Life
            </h1>
            <p className="home-para">
              Millions of people are searching for jobs, salary information,
              compony reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link className="link" to="/jobs">
              <button
                className="home-button"
                type="button"
                onClick={this.onFindJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
        <FooterContact />
      </div>
    )
  }
}

export default Home
