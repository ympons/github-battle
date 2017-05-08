import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import Loading from './Loading'

const SelectLanguage = (props) => {
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className="languages">
            {languages.map( (lang) => {
                return (
                    <li style={lang === props.selectedLanguage ? { color: '#d0021b' }: null}
                        onClick={() => {return props.onSelect(lang)}}
                        key={lang}>
                            {lang}
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

const RepoGrid = (props) => {
    return (
        <ul className='popular-list'>
            {props.repos.map( (repo, index) => {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img 
                                    className='avatar' 
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends Component {
    state = {
        selectedLanguage: 'All',
        repos: null
    }
    componentDidMount() {
        api.fetchPopularRepos(this.state.selectedLanguage)
            .then((repos) => {
                this.setState(() => {
                    return {
                        repos: repos
                    }
                })
            })
    }
    updateLanguage = (lang) => {
        this.setState(() => {
            return {
                selectedLanguage: lang
            }
        })
    }
    render() {        
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos
                    ? <Loading />
                    : <RepoGrid repos={this.state.repos} />
                }
            </div>
        )
    }
}

export default Popular;