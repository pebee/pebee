'use strict';

const bcrypt        = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {

    const User = {
        attributes: {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: _t('pebee.users.usernameTaken')
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: {
                    msg: _t('pebee.users.emailIsRequired')
                },
                validate: {
                    isEmail: { msg: _t('pebee.users.validEmail') }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
                }
            },
            accountCategoryId: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.AccountCategory,
                    key: 'id'
                },
                allowNull: false,
                validate: {
                    doesExist(val, next) {
                        sequelize.models.AccountCategory.findById(val).then(accountCategory => {
                            if (accountCategory) next();
                            else next(_t('pebee.db.accountCategoryDoesNotExist'));
                        });
                    }
                }
            }
        },
        options: {
            tableName: 'users',
            paranoid: true,
            timestamps: true,
            hooks: {},
            scopes: {
                withAccountCategory: function() {
                    return {
                        include: sequelize.models.AccountCategory
                    };
                },
                withPermissions: function() {
                    return {
                        include: {
                            model: sequelize.models.AccountCategory,
                            include: {
                                model: sequelize.models.Permission,
                                as: 'Permissions'
                            }
                        }
                    };
                }
            },
            validate: {},
            setterMethods: {
                accountCategory: function(accountCategoryId) {
                    return this.setDataValue('accountCategoryId', accountCategoryId);
                }
            }
        },
        classMethods: {
            verifyPassword: function(data) {
                if ( !data['password'] || !data['username'] ) {
                    return new Promise((resolve, reject) => {
                        reject(new Error(_t('pebee.global.passwordAndEmailRequiredToLogin')));
                    });
                }

                return this.scope(['withPermissions']).findOne({ where: { username: data['username'] } }).then(user => {
                    if (user) {
                        return ( bcrypt.compareSync(data['password'], user.get('password')) ) ? user : false;
                    }

                    return false;
                });
            },
            associate: function(models) {
                this.belongsTo(models.AccountCategory, { foreignKey: 'accountCategoryId' });
            }
        },
        instanceMethods: {
            serialize: function() {
                let keys = ['id', 'username', 'email'],
                    user = {};

                keys.forEach(key => {
                    user[key] = this.get(key);
                });

                user['isDeleted'] = !!this.get('deletedAt');

                user.accountCategory = this.AccountCategory ? this.AccountCategory.serialize() : this.get('accountCategoryId');

                return user;
            }
        }
    };

    return User;
};