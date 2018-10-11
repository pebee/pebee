import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ExtensionPage extends React.Component {

    render() {
        return (
            <p>Extension page</p>
        )
    }
        
}

ExtensionPage.contextTypes = {
    router: PropTypes.object.isRequired
};


const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return { dispatch };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExtensionPage)