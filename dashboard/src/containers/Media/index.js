import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Ant Design
import {
    Breadcrumb,
    Icon,
    Button
} from 'antd';

// Files component
import Files from './../../components/Files';

// Upload File Modal
import UploadFileModal from './../../components/UploadFileModal';

// Add Folder Modal
import AddFolderModal from './../../components/AddFolderModal';

// Actions
import {
    fetchFiles,

    showUploadFileModal,
    hideUploadFileModal,

    createFolder,
    showAddFolderModal,
    hideAddFolderModal,
    updateNewFolderName
} from './actions';

// Selector
import selector from './selector';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Styles
import Styles from './styles.scss';


class Media extends React.Component {

    componentDidMount() {
        this.props.fetchFiles();
    }

    componentDidUpdate(prevProps, prevState) {
        let query = queryString.parse(this.props.location.search);

        if (query.dir !== this.props.directory) {
            this.props.fetchFiles(query.dir);
        }
    }

    goToFolder = folderName => {
        this.props.history.push(`/media?dir=${folderName}`);
    }

    createFolder = () => {
        let data = {
            directory: this.props.directory,
            newDir: this.props.newFolderName
        };

        this.props.createFolder(data);
    }

    getBreadcrumbs = () => {
        let directories = this.props.directory ? this.props.directory.split('/') : [];
        let breadcrumbs = [];
        
        let fullDir = '';

        breadcrumbs.push(
            <Breadcrumb.Item key="root"><Link to="/media"><Icon type="home" /></Link></Breadcrumb.Item>
        );

        directories.forEach(directory => {
            fullDir += directory + '/';
            let href = `/media?dir=${fullDir}`;

            if (directory !== '') {
                breadcrumbs.push(
                    <Breadcrumb.Item key={directory}><Link to={href}>{directory}</Link></Breadcrumb.Item>
                )
            }
        });

        return breadcrumbs;
    }

    render() {
        return (
            <div>
                <UploadFileModal
                    visible={this.props.uploadFileModal}
                    closeModal={this.props.hideUploadFileModal}
                    directory={this.props.directory} />

                <AddFolderModal
                    closeModal={this.props.hideAddFolderModal}
                    submit={this.createFolder}
                    visible={this.props.addFolderModal}
                    directory={this.props.directory}
                    onChange={this.props.updateNewFolderName}
                    newFolderName={this.props.newFolderName} />

                <div className={Styles.HeaderContainer}>
                    <h1>
                        <FormattedMessage id="pebee.media.files" />
                    </h1>
                    <Button
                        onClick={this.props.showUploadFileModal}
                        type="primary"><FormattedMessage id="pebee.media.sendFiles" /></Button>
                    <Button
                        onClick={this.props.showAddFolderModal}
                        type="primary"><FormattedMessage id="pebee.media.addFolder" /></Button>
                </div>
                <Breadcrumb>
                    {this.getBreadcrumbs()}
                </Breadcrumb>
                <Files
                    folders={this.props.files.folders}
                    files={this.props.files.files}
                    changeFolder={this.goToFolder} />
            </div>
        )
    }

};

Media.contextTypes = {
    router: PropTypes.object.isRequired
};

Media.propTypes = {
    files: PropTypes.object.isRequired,
    message: PropTypes.string,
    directory: PropTypes.string,

    uploadFileModal: PropTypes.bool.isRequired,
    showUploadFileModal: PropTypes.func.isRequired,
    hideUploadFileModal: PropTypes.func.isRequired,

    createFolder: PropTypes.func.isRequired,
    addFolderModal: PropTypes.bool.isRequired,
    showAddFolderModal: PropTypes.func.isRequired,
    hideAddFolderModal: PropTypes.func.isRequired,
    newFolderName: PropTypes.string.isRequired,
    updateNewFolderName: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return selector(state);
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchFiles,

            showUploadFileModal,
            hideUploadFileModal,

            createFolder,
            showAddFolderModal,
            hideAddFolderModal,
            updateNewFolderName
        },
        dispatch
    )
};

const includeConnect = connect(mapStateToProps, mapDispatchToProps);
const includeReducer = withReducer('media', reducer);
const includeSaga = withSaga('media', saga);


export default compose(
    includeReducer,
    includeSaga,
    includeConnect
)(Media);