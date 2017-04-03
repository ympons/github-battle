import axios from 'axios'

const id = "CLIENT_ID"
const sec = "SECRET"
const param = "?client_id=" + id + "&client_secret=" + sec;

const getUserInfo = (username) => {
    return axios.get('https://api.github.com/users/' + username + param)
}

const getRepos = (username) => {
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100')
}

const getTotalStarts = (repos) => {
    return repos.data.reduce( (prev, current) => {
        return prev + current.stargazers_count
    }, 0)
}

const getPlayersData = (player) => {
    return getRepos(player.login)
        .then(getTotalStarts)
        .then( (totalStarts) => {
            return {
                followers: player.followers,
                totalStarts: totalStarts
            }
        })
}

const calculateScores = (players) => {
        return [
            players[0].followers * 3 + players[0].totalStarts,
            players[1].followers * 3 + players[1].totalStarts
        ]
}

const helpers = {
    getPlayersInfo: (players) => {
        return axios.all(players.map( (username) => {
            return getUserInfo(username)
        })).then( (info) => {
            return info.map( (user) => {
                return user.data
            })
        }).catch( (err) => {
            console.warn('Error in getPlayersInfo', err)
        })
    },
    battle: (players) => {
        const playerOneData = getPlayersData(players[0])
        const playerTwoData = getPlayersData(players[1])

        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch( (err) => {
                console.warn('Error in battle', err)
            })
    }
}

export default helpers;