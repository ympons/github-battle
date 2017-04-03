import React, { Component, PropTypes } from 'react';
import Prompt from '../components/Prompt'

class PromptContainer extends Component {
    state = {
        username: ''
    }
    handleUpdateUser = (e) => {
        this.setState({username: e.target.value})
    }
    handleSubmitUser = (e) => {
        e.preventDefault();
        var username = this.state.username;
        this.setState({username: ''});

        if (this.props.routeParams.playerOne) {
            this.context.router.push({
                pathname: '/battle',
                query: {
                    playerOne: this.props.routeParams.playerOne,
                    playerTwo: this.state.username
                }
            })
        } else {
            this.context.router.push('/playerTwo/' + this.state.username)
        }
    }
    render() {
        return (
            <Prompt 
                onSubmitUser={this.handleSubmitUser}
                onUpdateUser={this.handleUpdateUser}
                header={this.props.route.header}
                username={this.state.username} />
        );
    }
}

PromptContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

export default PromptContainer;