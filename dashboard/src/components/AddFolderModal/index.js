import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

// Ant Design
import {
    Modal,
    Input,
    Button
} from 'antd';


class AddFolderModal extends React.Component {

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.closeModal}
                title={formatMessage({ id: 'pebee.media.addFolder' })}
                footer={[
                    <Button
                        type="primary"
                        key="close"
                        onClick={this.props.submit}>
                        <FormattedMessage id="pebee.global.create" />
                    </Button>
                ]}>
                <Input
                    required="required"
                    placeholder={formatMessage({ id: 'pebee.media.folderName' })}
                    onChange={this.props.onChange}
                    value={this.props.newFolderName} />
            </Modal>
        )
    }
    
}


export default injectIntl(AddFolderModal);