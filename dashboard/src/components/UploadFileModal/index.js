import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

// Ant Design
import {
    Modal,
    Upload,
    Icon,
    Button,
    message
} from 'antd';


// TODO: API call url must be taken from some global variable instead hardcoded


class UploadFileModal extends React.Component {

    render() {
        const { formatMessage } = this.props.intl;
        const draggerProps = {
            name: 'files',
            multiple: true,
            withCredentials: true,
            data: {
                directory: this.props.directory
            },
            action: 'http://localhost:3000/api/storage/upload',
            onChange(info) {
                const status = info.file.status;

                if (status === 'done') {
                    message.success(formatMessage({ id: 'pebee.media.sendFilesSuccess' }));
                } else if (status === 'error') {
                    message.error(formatMessage({ id: 'pebee.media.sendFilesFailure' }));
                }
            }
        }

        return (
            <Modal
                title={formatMessage({ id: 'pebee.media.sendFiles' })}
                visible={this.props.visible}
                onCancel={this.props.closeModal}
                footer={[
                    <Button type="primary" key="close" onClick={this.props.closeModal}>
                        <FormattedMessage id="pebee.global.close" />
                    </Button>
                ]}>
                <Upload.Dragger {...draggerProps}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">{formatMessage({ id: 'pebee.media.clickOrDrag' })}</p>
                    <p className="ant-upload-hint">{formatMessage({ id: 'pebee.media.clickOrDragInfo' })}</p>
                </Upload.Dragger>
            </Modal>
        );
    }

}


export default injectIntl(UploadFileModal);