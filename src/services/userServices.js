import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const salt = bcrypt.genSaltSync(10);

dotenv.config()

const generateAccessToken = (user) => {
    const accessToken = jwt.sign({
        id: user.id,
        roleId: user.roleId,
        email: user.email,
    }, process.env.ASSESS_TOKEN_SECRET, { expiresIn: "30d" });
    return accessToken
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({
        id: user.id,
        roleId: user.roleId,
        email: user.email,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

    return refreshToken
}

const handleRefreshToken = (resFreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!resFreshToken) {
                resolve({
                    errCode: 1,
                    errMessage: "You're not authenticated"
                })
            }
            jwt.verify(resFreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                if (err) {
                    resolve({
                        errCode: 2,
                        errMessage: "You're got an error"
                    })
                } else {
                    const newAccessToken = await generateAccessToken(user);
                    const newRefreshToken = await generateRefreshToken(user);
                    resolve({ newAccessToken, newRefreshToken })

                }
            })
        } catch (err) {
            reject(err)
        }
    })

}



const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: email },
                    attributes: {
                        exclude: ['image', 'createdAt', 'updatedAt', 'keyId']
                    },
                    raw: true
                })

                if (user) {
                    const check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'oke';
                        delete user.password;
                        userData.user = {
                            id: user.id,
                            name: user.name,
                            gender: user.gender,
                            phoneNumber: user.phoneNumber,
                        };
                        const accessToken = await generateAccessToken(user)
                        const refreshToken = await generateRefreshToken(user)
                        userData.token = accessToken
                        userData.refreshToken = refreshToken
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email`;
            }
            // userData.user.image = Buffer.from(userData.user.image, 'base64').toString('binary');
          
            resolve(userData)

        } catch (e) {
            reject(e)
        }
    })
}
const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail },

            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}







//login=============

const handleCreateItemAllCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter!'
                })
            } else {
                await db.Allcode.create({
                    keyMap: data.keyMap,
                    type: data.type,
                    valueEn: data.valueEn,
                    valueVi: data.valueVi,
                });
                resolve({
                    errCode: 0,
                    message: 'oke'
                })
            }

        } catch (error) {
            console.log(error)
        }
    })

}



const createUserServices = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (data.roleId === "R2") {
                const check = await checkUserEmail(data.email)
                if (check === true) {
                    resolve({
                        errCode: 1,
                        errMessage: 'you email is already in used, please another email'
                    })
                } else {
                    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        name: data.name,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        roleId: data.roleId,
                        image: data.image,
                    });
                    resolve({
                        errCode: 0,
                        message: 'oke'
                    })
                }
            } else {
                if (!data.email || !data.password || !data.name
                    || !data.address || !data.phoneNumber || !data.gender
                    || !data.roleId || !data.image
                ) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Missing required parameter!'
                    })
                } else {
                    const check = await checkUserEmail(data.email)
                    if (check === true) {
                        resolve({
                            errCode: 1,
                            errMessage: 'you email is already in used, please another email'
                        })
                    } else {
                        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
                        await db.User.create({
                            email: data.email,
                            password: hashPasswordFromBcrypt,
                            name: data.name,
                            address: data.address,
                            phoneNumber: data.phoneNumber,
                            gender: data.gender,
                            roleId: data.roleId,
                            image: data.image,
                        });
                        resolve({
                            errCode: 0,
                            message: 'oke'
                        })
                    }
                }

            }

        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
};

const handleDeleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                const count = await db.User.destroy({ where: { id: id } });
                if (count) {
                    resolve({
                        errCode: 0,
                        errMessage: `Delete user success with ${count}`
                    })
                }
            }

        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}


const getAllUserServices = (userId, limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offset = (page - 1) * limit
            let users = '';
            let countData = '';
            if (userId === 'ALL') {
                const { count, rows: usersData } = await db.User.findAndCountAll({
                    offset: offset,
                    limit: limit,
                    order: [['updatedAt', 'DESC']],
                    attributes: {
                        exclude: ['password']
                    },
                    // raw: true,
                    // nest: true 
                    // nest: true
                })
                users = usersData;
                countData = count;
            }

            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (users && users.length > 0) {
                users.map((user) => {
                    if (user.image) {
                        user.image = Buffer.from(user.image, 'base64').toString('binary');
                        return user
                    }
                })

            }
            resolve({ users, countData })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCodeServices = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    error: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                const res = {};
                const allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }


        } catch (e) {
            reject(e)
        }
    })
}
const handleGetUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    error: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                const res = {};
                const user = await db.User.findOne({
                    where: { id: id }
                });
                if (user && user.image) {
                    user.image = Buffer.from(user.image, 'base64').toString('binary');
                }
                res.errCode = 0;
                res.data = user;
                resolve(res);
            }


        } catch (e) {
            reject(e)
        }
    })
}
const createUserCloneController = (dataUser, dataOderProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataUser.name || !dataUser.email || !dataUser.phoneNumber || !dataUser.gender
                // || !dataUser.quantity || !dataUser.productId
                || !dataUser.provincial || !dataUser.district
                || !dataUser.wards || !dataUser.streetName
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                const resOderInfo = await db.OderInfo.create({
                    name: dataUser.name,
                    email: dataUser.email,
                    phoneNumber: dataUser.phoneNumber,
                    gender: dataUser.gender,
                    provincial: dataUser.provincial,
                    district: dataUser.district,
                    wards: dataUser.wards,
                    streetName: dataUser.streetName,
                    note: dataUser.note,
                });
                if (resOderInfo) {
                    dataOderProduct.map(item => {
                        item.state = 1;
                        item.oderInfoId = resOderInfo.dataValues.id
                    })
                    await db.Oder.bulkCreate(dataOderProduct);
                }
                // let oderInfo = await db.OderInfo.findOne({
                //     where: { email: dataUser.email },
                //     raw: false
                // });
                // if (!oderInfo) {
                //     await db.OderInfo.create({
                //         name: dataUser.name,
                //         email: dataUser.email,
                //         phoneNumber: dataUser.phoneNumber,
                //         gender: dataUser.gender,
                //         provincial: dataUser.provincial,
                //         district: dataUser.district,
                //         wards: dataUser.wards,
                //         streetName: dataUser.streetName,
                //         note: dataUser.note,
                //     });
                // } else {

                // }
                resolve({
                    errCode: 0,
                    message: 'oke'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};
module.exports = {
    createUserServices,
    getAllUserServices,
    handleUserLogin,
    getAllCodeServices,
    handleGetUserById,
    createUserCloneController,
    handleRefreshToken,
    handleCreateItemAllCode,
    handleDeleteUserById
}
