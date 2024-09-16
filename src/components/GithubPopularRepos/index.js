import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    isLoading: false,
    popularReposList: [],
    activeTabId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeTabId} = this.state
    this.setState({isLoading: true})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    const formattedData = fetchedData.popular_repos.map(repo => ({
      name: repo.name,
      id: repo.id,
      issuesCount: repo.issues_count,
      forksCount: repo.forks_count,
      starsCount: repo.stars_count,
      avatarUrl: repo.avatar_url,
    }))

    if (response.ok === true) {
      this.setState({
        popularReposList: formattedData,
        isLoading: false,
      })
    } else {
      this.renderRepositoryItem(response.ok)
    }
  }

  onClickLanguageTab = id => {
    this.setState({activeTabId: id}, this.getPopularRepos)
  }

  renderLanguageFilterItem = () => {
    const {activeTabId} = this.state
    return (
      <ul className="language-container">
        {languageFiltersData.map(languageItem => (
          <LanguageFilterItem
            key={languageItem.id}
            languageData={languageItem}
            onClickLanguageTab={this.onClickLanguageTab}
            isActive={activeTabId === languageItem.id}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItem = responseTerm => {
    const {popularReposList} = this.state
    if (responseTerm === false) {
      return (
        <div className="error-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="failure-view"
          />
          <h1 className="error-msg">Something Went Wrong</h1>
        </div>
      )
    }
    return (
      <ul className="repository-container">
        {popularReposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="repository-loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="repos-container">
        <h1 className="title">Popular</h1>
        {this.renderLanguageFilterItem()}
        {isLoading ? this.renderLoader() : this.renderRepositoryItem()}
      </div>
    )
  }
}

export default GithubPopularRepos
