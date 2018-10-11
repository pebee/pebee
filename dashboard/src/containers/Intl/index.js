import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Intl
import { IntlProvider } from 'react-intl';

// Selector
import selectLocale from './selector';

import intlMessages from './../../utils/intl';



class Intl extends React.Component {

    render() {
        const messages = intlMessages[this.props.locale] ? intlMessages[this.props.locale] : {};

        return (
            <IntlProvider defaultLocale="en" messages={messages} locale={this.props.locale}>
                {this.props.children}
            </IntlProvider>
        )
    }

}


Intl.propTypes = {
    children: PropTypes.object.isRequired
};


const mapStateToProps = selectLocale();

const mapDispatchToProps = dispatch => {
    return { dispatch };
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Intl);