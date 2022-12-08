import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);



const handleCreateProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.nameItem || !data.quantity ||
                !data.price || !data.image || !data.type) {
                resolve({
                    erCode: 1,
                    message: 'Missing parameter!'
                })
            } else {
                if (!data.id) {
                    let sendData = {
                        nameItem: data.nameItem,
                        quantity: data.quantity,
                        price: data.price,
                        image: data.image,
                        type: data.type,
                        manufacturer: data.manufacturer,
                        ram: data.ram,
                        rom: data.rom,
                        pin: data.pin,
                        display: data.display,
                        camera: data.camera,
                        chip: data.chip,
                        hdh: data.operatingSystem,
                        imgAngle: data.imgAngle
                    }
                    if (data.type === 'PL2') {
                        delete sendData.ram
                        delete sendData.rom
                        delete sendData.pin
                        delete sendData.display
                        delete sendData.camera
                    }
                    const test = await db.Product.create(sendData);
                    resolve({
                        errCode: 0,
                        message: `Create product success`,
                        test: test.id
                    });

                } else {
                    let product = await db.Product.findOne({
                        where: { id: data.id },
                        raw: false
                    })
                    product.price = data.price;
                    await product.save();
                    resolve({
                        errCode: 2,
                        message: `Update product success`,
                    });
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}


const handleGetAllProductService = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offset = (page - 1) * limit
            let products = '';
            let countData = '';

            const { count, rows: productData } = await db.Product.findAndCountAll({
                offset: offset,
                limit: limit,
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'typeData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'manufacturerData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'pinData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'cameraData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'displayData', attributes: ['valueVi', 'valueEn'] },
                ],
                raw: true,
                nest: true
            })
            products = productData;
            countData = count;
            if (products && products.length > 0) {
                products.map((item) => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item
                })

            }
            resolve({ products, countData })

        } catch (e) {
            reject(e)
        }
    })

};

const handleGetAllProductHome = (limit, option) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ''
            let countData = ''
            const { count, rows: productData } = await db.Product.findAndCountAll({
                where: { type: option },
                limit: limit,
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'manufacturerData', attributes: ['valueVi', 'valueEn'] },
                ],
                attributes: {
                    exclude: ['manufacturer', 'type', 'quantity']
                },
                raw: true,
                nest: true
            })
            products = productData;
            countData = count;
            if (products && products.length > 0) {
                products.map((item) => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    // delete item.image
                    return item
                })

            }
            resolve({ products, countData })

        } catch (e) {
            reject(e)
        }
    })

};

const handleDeleteAllProductService = (count) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (+count === 0) {

                if (product.length !== 0) {
                    const res = db.Product.destroy({
                        where: {},
                        truncate: true
                    })
                    if (res) {
                        resolve({
                            error: 0,
                            errorMessage: 'delete all products oke'
                        })
                    }
                } else {
                    resolve({
                        error: 2,
                        errorMessage: 'Call success'
                    })
                }

            } else {
                resolve({
                    error: 1,
                    errorMessage: 'Not done'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};
const handleBuyWithStateProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.itemState || !data.addressItem || !data.buyer) {
                resolve({
                    erCode: 2,
                    message: 'Missing parameter!'
                })
            } else {
                let product = await db.Product.findOne({
                    where: { addressItem: data.addressItem },
                    raw: false
                });
                if (product) {
                    if (+product.state === 0) {
                        product.cart = data.keyId;
                    }
                    product.state = data.itemState;
                    product.buyer = data.buyer;
                    await product.save();
                    resolve({
                        errCode: 0,
                        message: `buy product success`
                    });
                } else {
                    resolve({
                        erCode: 3,
                        message: 'Buy with state product error!'
                    })
                }

            }
        } catch (e) {
            reject(e);
        }
    })

};
const handleUpdateProductCartService = (keyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!keyId) {
                resolve({
                    erCode: 2,
                    message: 'Missing parameter!'
                })
            } else {
                let product = await db.Product.findAll({
                    where: { cart: keyId },
                    raw: false
                });
                product.map(item => {
                    if (item && item.image) {
                        item.image = Buffer.from(item.image, 'base64').toString('binary');
                    }
                    return item
                })
                resolve({
                    errCode: 0,
                    message: 'Oke',
                    data: product
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}
const handleDeleteProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                const count = await db.Product.destroy({ where: { id: id } });
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
};
const handleCreateColorProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameter!`
                })
            } else {
                await db.Color.bulkCreate(data);
                resolve({
                    errCode: 0,
                    message: `The color is create`
                })
            }

        } catch (e) {
            reject(e)
        }
    })
};
const handleCreateImgDetailProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameter!`
                })
            } else {
                await db.DetailPhotos.bulkCreate(data);
                resolve({
                    errCode: 0,
                    message: `The color is create`
                })
            }

        } catch (e) {
            reject(e)
        }
    })
};
const handleGetProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = '';
            
            product = await db.Product.findByPk(id, {
                include: [
                    { model: db.Allcode, as: 'typeData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'manufacturerData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'pinData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'cameraData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'displayData', attributes: ['valueVi', 'valueEn'] },
                    {
                        model: db.Color,
                        attributes: ['color'],
                        as: 'colorData',
                        plain: true,
                    },
                    {
                        model: db.DetailPhotos,
                        attributes: ['image'],
                        as: 'photoDetail',
                        plain: true
                    }
                ]
            });
            if (product && product.image) {
                product.image = Buffer.from(product.image, 'base64').toString('binary');
            }
            if (product && product.imgAngle) {
                product.imgAngle = Buffer.from(product.imgAngle, 'base64').toString('binary');
            }
            if (product && product.photoDetail && product.photoDetail.length > 0) {
                product.photoDetail.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            
            product.errCode = 0;
            resolve(product)
        } catch (e) {
            reject(e)
        }
    })

};
const handleAllProductOnlyNameAndId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findAll({
                attributes: ['nameItem', 'id'],
            });
            if (!product) {
                resolve({
                    errCode: 2,
                    message: `not find all product!`
                })
            }
            resolve(product)
        } catch (e) {
            reject(e)
        }
    })
};
const handlePostMarkDown = (markdown) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!markdown.contentHTML || !markdown.contentMarkdown) {
                resolve({
                    errCode: 2,
                    message: `Missing parameter!`
                })
            } else {
                const post = await db.MarkDown.create(markdown)
                if (post) {
                    resolve({
                        errCode: 0,
                        message: `create markdown success`,
                        errMessage: post
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
};
const handleMarkDownById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const markdown = await db.MarkDown.findOne({ where: { productId: id } });
            if (!markdown) {
                resolve({
                    errCode: 2,
                    message: `The product isn't exist`
                })
            } else {
                resolve(markdown)
            }
        } catch (e) {
            reject(e)
        }
    })
};

const createOder = ({ dataOder, dataOderProduct }) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!dataOder.name || !dataOder.email || !dataOder.phoneNumber || !dataOder.gender
                || !dataOder.provincial || !dataOder.district
                || !dataOder.wards || !dataOder.streetName || !dataOder.state
                || !dataOder.quantity || !dataOder.sumPrice
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                const oder = db.Oder.findOne({
                    where: { userId: dataOder.userId }
                })
                if (oder === null) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Temporarily unable to order'
                    })
                } else {
                    await db.Oder.create({
                        userId: dataOder.userId,
                        name: dataOder.name,
                        email: dataOder.email,
                        phoneNumber: dataOder.phoneNumber,
                        gender: dataOder.gender,
                        provincial: dataOder.provincial,
                        district: dataOder.district,
                        wards: dataOder.wards,
                        streetName: dataOder.streetName,
                        state: dataOder.state,
                        quantity: dataOder.quantity,
                        sumPrice: dataOder.sumPrice,
                        note: dataOder.note,
                    }).then(async (data) => {
                        if (data && data.dataValues && data.dataValues.id) {
                            dataOderProduct.map(item => {
                                item.oderId = data.dataValues.id
                            })
                            await db.ProductOder.bulkCreate(dataOderProduct);
                        }
                    });

                    resolve({
                        errCode: 0,
                        message: 'oke'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
};
const getOderById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const oder = await db.Oder.findOne({
                where: { userId: id },
                include: [
                    { model: db.ProductOder, },
                ],
            });
            if (!oder) {
                resolve({
                    errCode: 2,
                    message: `The product isn't exist`
                })
            } else {
                resolve({
                    errCode: 0,
                    message: `oke`,
                    data: oder
                })
            }
        } catch (e) {
            reject(e)
        }
    })
};

module.exports = {
    handleCreateProductService,
    handleGetProductById,
    handleGetAllProductService,
    handleDeleteAllProductService,
    handleBuyWithStateProductService,
    handleUpdateProductCartService,
    handleDeleteProductById,
    handleCreateColorProduct,
    handleCreateImgDetailProduct,
    handleGetAllProductHome,
    handleAllProductOnlyNameAndId,
    handlePostMarkDown,
    handleMarkDownById,
    createOder,
    getOderById
}
