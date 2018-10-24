import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import fileDownload from 'js-file-download';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Ant Design
import {
    Breadcrumb,
    Icon,
    Button,
    message
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

    toggleUploadFileModal,

    createFolder,
    toggleAddFolderModal,
    updateNewFolderName,

    hideMessage,

    downloadFile,
    resetDownloadFile,

    toggleDeleteFilePopconfirm,
    deleteFile
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

    closeAddFolderModal = () => {
        this.props.fetchFiles(this.props.directory);
        this.props.toggleAddFolderModal();
    }

    closeUploadFileModal = () => {
        this.props.fetchFiles(this.props.directory);
        this.props.toggleUploadFileModal();
    }

    componentDidUpdate(prevProps, prevState) {
        let query = queryString.parse(this.props.location.search);

        if (this.props.message && this.props.message !== '') {
            message[this.props.messageType](this.props.message).then(this.props.hideMessage());
        }

        if (query.dir !== this.props.directory) {
            this.props.fetchFiles(query.dir);
        }

        if (this.props.fileDownloadContent) {
            fileDownload(this.props.fileDownloadContent, this.props.downloadFileName);
            this.props.resetDownloadFile();
        }
    }

    goToFolder = folderName => {
        this.props.history.push(`/media?dir=${folderName}`);
    }

    createFolder = () => {
        if (this.props.newFolderName && this.props.newFolderName !== '') {
            let data = {
                directory: this.props.directory,
                newDir: this.props.newFolderName
            };

            this.props.createFolder(data);
        }
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
                    closeModal={this.closeUploadFileModal}
                    directory={this.props.directory} />

                <AddFolderModal
                    closeModal={this.closeAddFolderModal}
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
                        onClick={this.props.toggleUploadFileModal}
                        type="primary"><FormattedMessage id="pebee.media.sendFiles" /></Button>
                    <Button
                        onClick={this.props.toggleAddFolderModal}
                        type="primary"><FormattedMessage id="pebee.media.addFolder" /></Button>
                </div>
                <Breadcrumb>
                    {this.getBreadcrumbs()}
                </Breadcrumb>
                <Files
                    folders={this.props.files.folders}
                    files={this.props.files.files}
                    changeFolder={this.goToFolder}
                    downloadFile={this.props.downloadFile}
                    toggleDeleteFilePopconfirm={this.props.toggleDeleteFilePopconfirm}
                    deleteFilePopconfirm={this.props.deleteFilePopconfirm}
                    deleteFile={this.props.deleteFile}
                    spinning={this.props.spinning} />
            </div>
        )
    }

};

Media.contextTypes = {
    router: PropTypes.object.isRequired
};

Media.propTypes = {
    spinning: PropTypes.bool.isRequired,

    files: PropTypes.object.isRequired,
    message: PropTypes.string,
    directory: PropTypes.string,

    uploadFileModal: PropTypes.bool.isRequired,
    toggleUploadFileModal: PropTypes.func.isRequired,

    createFolder: PropTypes.func.isRequired,
    addFolderModal: PropTypes.bool.isRequired,
    toggleAddFolderModal: PropTypes.func.isRequired,
    newFolderName: PropTypes.string.isRequired,
    updateNewFolderName: PropTypes.func.isRequired,

    hideMessage: PropTypes.func.isRequired,
    message: PropTypes.string,
    messageType: PropTypes.string,
    
    downloadFile: PropTypes.func.isRequired,
    downloadFileName: PropTypes.string.isRequired,
    fileDownloadContent: PropTypes.any,
    resetDownloadFile: PropTypes.func.isRequired,

    toggleDeleteFilePopconfirm: PropTypes.func.isRequired,
    deleteFilePopconfirm: PropTypes.bool.isRequired,
    deleteFile: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return selector(state);
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchFiles,

            toggleUploadFileModal,

            createFolder,
            toggleAddFolderModal,
            updateNewFolderName,

            hideMessage,

            downloadFile,
            resetDownloadFile,

            toggleDeleteFilePopconfirm,
            deleteFile
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