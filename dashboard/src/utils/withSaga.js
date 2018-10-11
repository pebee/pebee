import React from 'react';
import PropTypes from 'prop-types';


const withSaga = (key, saga) => WrappedComponent => {

    const WithSaga = (props, context) => {        
        context.store.injectSaga(key, saga);
        return <WrappedComponent {...props} />
    };

    WithSaga.contextTypes = {
        store: PropTypes.object
    };

    return WithSaga;
    
}


export default withSaga;