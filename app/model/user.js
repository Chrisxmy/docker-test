'use strict'

const {pbkdf2, randomBytes} = require('crypto')
const {promisify} = require('util')
const uuid = require('uuid/v4')

const pbkdf2P = promisify(pbkdf2)
const randomBytesP = promisify(randomBytes)


async function genCryptedPassword(RawPassword, salt) {
    if(!salt) salt = await randomBytesP(32)
    const cryptedPassword = await pbkdf2P(RawPassword, salt.toString(), 10000, 128, 'sha512')

    return {
        salt: salt.toString(),
        cryptedPassword: cryptedPassword.toString()
    }
}

module.exports = (app, model) => {
    const {STRING, INTEGER, DATE, UUID, Op} = app.Sequelize

    const UserModel = model.define('user', {
        id: {
            type: UUID,
            primaryKey: true
        },
        username: {
            type: STRING(30),
        },
        password: {
            type: STRING(256)
        },
        salt: {
            type: STRING(128)
        },
        phone: STRING,
        created_at: DATE,
        updated_at: DATE
    }, {
        indexes: [
            {
                fields: ['username'],
                unique: true
            }
        ]
    })
    UserModel.sync()

    UserModel.sign = async (username, password) => {
        const {salt, cryptedPassword} = await genCryptedPassword(password)
        const user = await UserModel.create({
            id: uuid(),
            username,
            password: cryptedPassword,
            salt
        })
        return user
    }

    UserModel.loginWithUnPa = async (username, password) => {
        const user = await UserModel.findOne({
            attributes: ['id', 'password', 'salt'],
            where: {
                username: {
                    [Op.eq]: username
                }
            }
        })
        if(!user) throw new app.error.InvalidParam('username','password','用户不存在')

        const foundPassword = user.password;
        const { cryptedPassword } = await genCryptedPassword(password,  user.salt);

        if(foundPassword !== cryptedPassword) throw new app.error.InvalidParam('username','password','密码错误')

        return {
            id: user.id
        }

    }


    return UserModel
}
