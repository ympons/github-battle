import React, { Component, PropTypes } from 'react';
import ConfirmBattle from '../components/ConfirmBattle';
import githubHelpers from '../utils/githubHelpers'

class ConfirmBattleContainer extends Component {
    state = {
        isLoading: true,
        playersInfo: []
    }
    componentDidMount() {
        var query = this.props.location.query;
        githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
            .then((players) => {
                this.setState({
                    isLoading: false,
                    playersInfo: [players[0], players[1]]
                })
            })
    }
    handleInitiateBattle = () => {
        this.context.router.push({
            pathname: '/results',
            state: {
                playersInfo: this.state.playersInfo
            }
        })
    }
    render() {
        return (
            <ConfirmBattle 
                isLoading={this.state.isLoading}
                onInitiateBattle={this.handleInitiateBattle}
                playersInfo={this.state.playersInfo} />
        );
    }
}

ConfirmBattleContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

export default ConfirmBattleContainer;