import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
require('../main.css')

const Main = (props) => {
    return (
        <div className='main-container'>
            <ReactCSSTransitionGroup
                transitionName="appear"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
            {React.cloneElement(props.children, {key: props.location.pathname})}
            </ReactCSSTransitionGroup>
        </div>
    )
}

export default Main;