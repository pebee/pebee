import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Ant Design
import {
    message,
    Row,
    Button
} from 'antd';

// Table
import AccountCategoriesTable from './../../components/AccountCategoriesTable';

// Actions
import { fetchAccountCategories } from './actions';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Selector
import selector from './selector';
import { bindActionCreators } from 'redux';

// Styles
import Styles from './styles.scss';


class AccountCategoriesList extends React.Component {

    componentDidMount() {
        this.props.fetchAccountCategories();
    }

    componentDidUpdate() {
        if (!!this.props.errorMessage) {
            message.error(this.props.errorMessage);
        }
    }

    goToAddNew = () => {
        this.props.history.push('/account-categories/add');
    }

    render() {
        return (
            <div>
                <Row
                    className={Styles.HeaderRow}>
                    <h1>
                        <FormattedMessage id="pebee.home.accountCategories" />
                    </h1>
                    <Button
                        style={{ marginLeft: '30px' }}
                        type="primary"
                        onClick={this.goToAddNew}><FormattedMessage id="pebee.accountCategories.addNew" /></Button>
                </Row>
                <AccountCategoriesTable
                    data={this.props.accountCategories} />
            </div>
        );
    }

}


AccountCategoriesList.contextTypes = {
    router: PropTypes.object.isRequired
};


AccountCategoriesList.propTypes = {
    accountCategories: PropTypes.array.isRequired,
    fetchAccountCategories: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return selector(state);
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchAccountCategories
        },
        dispatch
    )
};


const includeReducer = withReducer('accountCategoriesList', reducer);
const includeSaga = withSaga('accountCategoriesList', saga);
const includeConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);



export default compose(
    includeReducer,
    includeSaga,
    includeConnect
)(AccountCategoriesList);