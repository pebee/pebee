import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { orderBy } from 'lodash';

// Ant Design
import {
    Icon,
    Dropdown,
    Menu
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

    downloadFile = (e) => {
        this.props.downloadFile(e.key);
    }

    fileMenu = (fileName) => {
        return (
            <Menu onClick={this.downloadFile}>
                <Menu.Item key={fileName}>
                    <span><FormattedMessage id="pebee.global.download" /></span>
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
                    <Dropdown overlay={this.fileMenu(file.fullName)} trigger={['click']}>
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
            <div style={{ display: 'inline-block' }}>
                {this.getFolders()}
                {this.getFiles()}
            </div>
        )
    }

}


Files.propTypes = {
    files: PropTypes.array.isRequired,
    folders: PropTypes.array.isRequired
};


export default Files;