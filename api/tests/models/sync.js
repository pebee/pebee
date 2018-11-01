'use strict';



// TODO: zrobić to na zasadzie Promise.all([])
module.exports = () => {

    return pebee.models.sequelize.sync({ force: true }).then(() => {

        // Account Categories
        return pebee.models.AccountCategory.bulkCreate([
            { name: 'Administrator', label: 'administrator' },
            { name: 'Subscriber', label: 'subscriber' }
        ]).then(() => {

            // Users
            return pebee.models.User.bulkCreate([
                { username: 'user #1', accountCategory: 1, password: 'password', email: 'user1@example.com' },
                { username: 'user #2', accountCategory: 1, password: 'password', email: 'user2@example.com' },
                { username: 'user #3', accountCategory: 2, password: 'password', email: 'user3@example.com' }
            ]).then(() => {

                // Permissions
                return pebee.models.Permission.bulkCreate([
                    { name: 'Can view users', label: 'can-view-users' },
                    { name: 'Can add users', label: 'can-add-users' },
                    { name: 'Can update users', label: 'can-update-users' },
                    { name: 'Can delete users', label: 'can-delete-users' },
                    { name: 'Can view account categories', label: 'can-view-account-categories' },
                    { name: 'Can add account categories', label: 'can-add-account-categories' },
                    { name: 'Can update account categories', label: 'can-update-account-categories' },
                    { name: 'Can delete account categories', label: 'can-delete-account-categories' },
                    { name: 'permission #4', label: 'permission-4' }
                ]).then(() => {

                    // Account Category Permissions
                    return pebee.models.AccountCategoryPermissions.bulkCreate([
                        { accountCategoryId: 1, permissionId: 1 },
                        { accountCategoryId: 1, permissionId: 2 },
                        { accountCategoryId: 1, permissionId: 3 },
                        { accountCategoryId: 1, permissionId: 4 },
                        { accountCategoryId: 1, permissionId: 5 },
                        { accountCategoryId: 1, permissionId: 6 },
                        { accountCategoryId: 1, permissionId: 7 },
                        { accountCategoryId: 1, permissionId: 8 },
                        { accountCategoryId: 2, permissionId: 9 },
                    ]).then(() => {

                        // Options
                        return pebee.models.Option.bulkCreate([
                            { key: 'lang', displayName: 'Language', value: 'en', isProtected: true }
                        ]);

                    });
                });
            });
        });

    });

}
