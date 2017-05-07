import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
    state = {
        text: this.props.text
    }
    componentDidMount() {
        const stopper = this.originalText + '...'
        this.interval = setInterval(() => {
           (this.state.text === stopper)
                ? this.setState(() => { return { text: this.props.text } })
                : this.setState((prevState) => { return { text: prevState.text + '.' } })
        }, this.props.speed)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }    
    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        );
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number
}

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}
export default Loading;