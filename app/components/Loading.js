import React, { Component, PropTypes } from 'react';

class Loading extends Component {
    originalText = this.props.text
    state = {
        text: this.originalText
    }
    componentDidMount() {
        const stopper = this.originalText + '...'
        this.interval = setInterval(() => {
           (this.state.text === stopper)
                ? this.setState({ text: this.originalText  })
                : this.setState({ text: this.state.text + '.' })
        }, this.props.speed)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        return (
            <div style={styles.container}>
                <p style={styles.content}> {this.state.text} </p>
            </div>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}

const styles = {
    container: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        fontSize: '55px'
    },
    content: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        marginTop: '30px'
    }
}

export default Loading;