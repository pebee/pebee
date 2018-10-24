import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { orderBy } from 'lodash';

// Ant Design
import {
    Icon,
    Dropdown,
    Menu,
    Popconfirm,
    Spin
} from 'antd';

// Styles
import Styles from './styles.scss';


class Files extends React.Component {

    getIconByContentType = contentType => {

        switch (contentType) {

            case 'application/pdf':
                return 'file-pdf';

            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'file-word';

            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'file-excel';

            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
                return 'picture';

            default:
                return 'file';

        }

    }

    downloadFile = (e, file) => {

        switch(e.key) {
            case 'download':
                return this.props.downloadFile({ fullName: file.fullName, filename: file.name });

            case 'delete':
                return this.props.toggleDeleteFilePopconfirm();

            default:
                return;
        }

    }

    fileMenu = (file) => {
        const { formatMessage } = this.props.intl;
        const { deleteFile } = this.props;

        return (
            <Menu onClick={(e) => { e.domEvent.preventDefault(); this.downloadFile(e, file); }}>
                <Menu.Item key="download">
                    <span><FormattedMessage id="pebee.global.download" /></span>
                </Menu.Item>
                <Menu.Item key="delete">
                    <Popconfirm
                        visible={this.props.deleteFilePopconfirm}
                        title={formatMessage({ id: 'pebee.media.confirmDelete' })}
                        onConfirm={() => deleteFile({ filename: file.fullName })}
                        onCancel={() => console.log('canceled')}
                        okText={formatMessage({ id: 'pebee.global.delete' })}
                        cancelText={formatMessage({ id: 'pebee.global.no' })}>
                        <span><FormattedMessage id="pebee.global.delete" /></span>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
    }

    getFolders = () => {
        let folders = [];
        let sortedFolders = orderBy(this.props.folders, f => { return f.name.toLowerCase() }, 'asc');

        sortedFolders.forEach(folder => {
            folders.push(
                <div key={folder.name} className={Styles.FileContainer}>
                    <Icon onClick={() => this.props.changeFolder(folder.fullName)} type="folder" theme="filled" style={{ fontSize: '24px' }}/>
                    <span style={{ fontSize: '12px' }}>{folder.name}</span>
                </div>
            )
        });

        return folders;
    }

    getFiles = () => {
        let files = [];
        let sortedFiles = orderBy(this.props.files, f => { return f.name.toLowerCase() }, 'asc');

        sortedFiles.forEach(file => {
            files.push(
                <div key={file.name} style={{ float: 'left' }}>
                    <Dropdown overlay={this.fileMenu(file)} trigger={['click']}>
                        <div className={Styles.FileContainer}>
                            <Icon type={this.getIconByContentType(file.contentType)} theme="outlined" style={{ fontSize: '24px' }} />
                            <span style={{ fontSize: '12px' }}>{file.name}</span>
                        </div>
                    </Dropdown>
                </div>
            )
        });

        return files;
    }

    render() {
        return (
            <Spin spinning={this.props.spinning}>
                <div style={{ display: 'inline-block' }}>
                    {this.getFolders()}
                    {this.getFiles()}
                </div>
            </Spin>
        )
    }

}


Files.propTypes = {
    spinning: PropTypes.bool.isRequired,
    files: PropTypes.array.isRequired,
    folders: PropTypes.array.isRequired,

    downloadFile: PropTypes.func.isRequired,
    deleteFilePopconfirm: PropTypes.bool.isRequired,
    toggleDeleteFilePopconfirm: PropTypes.func.isRequired
};


export default injectIntl(Files);