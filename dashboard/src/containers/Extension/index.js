import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ExtensionPage extends React.Component {

    render() {
        const slug = this.props.match.params['slug'];

        return (
            <p>{slug}</p>
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