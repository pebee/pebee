import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Ant Design
import {
    Col
} from 'antd';

// Actions
import { fetchOptions } from './actions';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Selector
import selector from './selector';

// Options Form
import OptionsForm from './../../components/OptionsForm';


class Options extends React.Component {

    componentDidMount() {
        this.props.fetchOptions();
    }

    render() {
        return (
            <div>
                <Col span={16}>
                    <h1>
                        <FormattedMessage id="pebee.options.systemOptions" />
                    </h1>
                    <OptionsForm
                        options={this.props.options} />
                </Col>
            </div>
        )
    }

}


Options.propTypes = {
    options: PropTypes.array.isRequired,
    fetchOptions: PropTypes.func.isRequired,
    message: PropTypes.string
};


const mapStateToProps = state => {
    return selector(state);
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchOptions
        },
        dispatch
    );
};

const injectConnect = connect(mapStateToProps, mapDispatchToProps);
const injectReducer = withReducer('options', reducer);
const injectSaga = withSaga('options', saga);


export default compose(
    injectReducer,
    injectSaga,
    injectConnect
)(Options);