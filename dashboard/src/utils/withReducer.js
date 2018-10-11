import React from 'react';
import PropTypes from 'prop-types';


const withReducer = (key, reducer) => WrappedComponent => {


    const WithReducer = (props, context) => {
        context.store.injectReducer(key, reducer);
        return <WrappedComponent {...props} />
    }

    WithReducer.contextTypes = {
        store: PropTypes.object
    };

    return WithReducer;

}


export default withReducer;