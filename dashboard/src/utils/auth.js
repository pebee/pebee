import { find } from 'lodash';


const authorizeUser = (account, permissionLabel) => {
    let permission = undefined;

    if ( account && account.accountCategory && Array.isArray(account.accountCategory.permissions) ) {
        permission = find(account.accountCategory.permissions, (userPermission) => {
            return userPermission.label === permissionLabel;
        });
    }

    return permission;
};


export {
    authorizeUser
};