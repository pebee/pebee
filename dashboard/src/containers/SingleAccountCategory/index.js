import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { isNumber } from 'util';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Ant Design
import {
    Col
} from 'antd';

// Account Category Form
import AccountCategoryForm from './../../components/AccountCategoryForm';

// Actions
import { fetchAccountCategory, resetAccountCategory, saveAccountCategory, fetchPermissions } from './actions';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Selector
import selector from './selector';



class SingleAccountCategory extends React.Component {

    componentDidMount() {
        this.props.fetchPermissions();

        if (this.props.match.params['id'] && isNumber(parseInt(this.props.match.params['id'])) ) {
            this.props.fetchAccountCategory(this.props.match.params['id']);
        }
    }

    submitForm = data => {
        this.props.saveAccountCategory(data);
    }

    render() {
        let headerId = this.props.accountCategory.id ? 'pebee.accountCategories.editAccountCategory' : 'pebee.accountCategories.addAccountCategory';

        return (
            <div>
                <Col span={16}>
                    <h1>
                        <FormattedMessage id={headerId} />
                    </h1>
                    <AccountCategoryForm
                        accountCategory={this.props.accountCategory}
                        submitForm={this.submitForm}
                        permissions={this.props.permissions} />
                </Col>
            </div>
        )
    }

    componentWillUnmount() {
        this.props.resetAccountCategory();
    }

}


SingleAccountCategory.contextTypes = {
    router: PropTypes.object.isRequired
};

SingleAccountCategory.propTypes = {
    accountCategory: PropTypes.object.isRequired,
    resetAccountCategory: PropTypes.func.isRequired,
    fetchAccountCategory: PropTypes.func.isRequired,
    saveAccountCategory: PropTypes.func.isRequired,
    fetchPermissions: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    permissions: PropTypes.array.isRequired
};


const mapStateToProps = state => {
    return selector(state);
};


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchAccountCategory,
            resetAccountCategory,
            saveAccountCategory,
            fetchPermissions
        },
        dispatch
    )
};

const includeConnect = connect(mapStateToProps, mapDispatchToProps);
const includeReducer = withReducer('singleAccountCategory', reducer);
const includeSaga = withSaga('singleAccountCategory', saga);


export default compose(
    includeReducer,
    includeSaga,
    includeConnect
)(SingleAccountCategory);