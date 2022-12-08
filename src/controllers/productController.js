import productServices from '../services/productServices'
const handleCreateProduct = async (req, res) => {
    try {
        const data = req.body;
        const message = await productServices.handleCreateProductService(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const handleGetAllProduct = async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    try {
        const data = await productServices.handleGetAllProductService(+limit, +page);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'oke',
            data: data && data.products ? data.products : [],
            count: data && data.products ? data.countData : ''
        })
    } catch (e) {
        console.log('get all user error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleDeleteProduct = async (req, res) => {
    try {
        const count = req.query.count;
        if (count) {
            const message = await productServices.handleDeleteAllProductService(count);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 0,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('delete product user error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleBuyWithStateProduct = async (req, res) => {
    try {
        const product = req.body;
        if (product) {
            const message = await productServices.handleBuyWithStateProductService(product);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('buy with state product error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleUpdateProductCart = async (req, res) => {
    try {
        const keyId = req.query.keyId;
        if (keyId) {
            const message = await productServices.handleUpdateProductCartService(keyId);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('update product cart error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
const handleDeleteProductById = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const message = await productServices.handleDeleteProductById(id);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('delete product error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleCreateColorProduct = async (req, res) => {
    try {
        const data = req.body
        if (data) {
            const message = await productServices.handleCreateColorProduct(data);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('delete product error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleCreateImgDetailProduct = async (req, res) => {
    try {
        const data = req.body
        if (data) {
            const message = await productServices.handleCreateImgDetailProduct(data);
            return res.status(200).json(message)
        } else {
            return res.status(200).json({
                error: 1,
                errorMessage: 'Missing parameter'
            })
        }
    } catch (e) {
        console.log('delete product error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleGetAllProductHome = async (req, res) => {
    const limit = req.query.limit;
    const option = req.query.option;
    try {
        const data = await productServices.handleGetAllProductHome(+limit, option);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'oke',
            data: data?.products || [],
            count: data && data.products ? data.countData : ''
        })
    } catch (e) {
        console.log('get all user error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleGetProductById = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(500).json({
                errCode: 1,
                errMessage: 'missing require parameter',
                data: {}
            })
        }
        const data = await productServices.handleGetProductById(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'oke',
            data: data ? data : {}
        })
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleAllProductOnlyNameAndId = async (req, res) => {
    try {
        const data = await productServices.handleAllProductOnlyNameAndId();
        return res.status(200).json({
            errCode: 0,
            errMessage: 'oke',
            data: data ? data : []
        })
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handlePostMarkDown = async (req, res) => {
    const markdown = req.body
    try {
        if (!markdown) {
            return res.status(500).json({
                errCode: 1,
                errMessage: 'missing require parameter',
                data: {}
            })
        } else {
            const message = await productServices.handlePostMarkDown(markdown);
            return res.status(200).json(message)
        }

    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const handleMarkDownById = async (req, res) => {
    const id = req.query.id
    try {
        if (!id) {
            return res.status(500).json({
                errCode: 1,
                errMessage: 'missing require parameter',
                data: {}
            })
        } else {
            const data = await productServices.handleMarkDownById(id);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'oke',
                data: data ? data : {}
            })
        }

    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const createOder = async (req, res) => {
    try {
        const message = await productServices.createOder(req.body);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};

const getOderById = async (req, res) => {
    try {
        const message = await productServices.getOderById(req.query.id);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
module.exports = {
    handleCreateProduct,
    handleGetProductById,
    handleGetAllProduct,
    handleDeleteProduct,
    handleCreateColorProduct,
    handleBuyWithStateProduct,
    handleUpdateProductCart,
    handleDeleteProductById,
    handleCreateImgDetailProduct,
    handleGetAllProductHome,
    handleAllProductOnlyNameAndId,
    handlePostMarkDown,
    handleMarkDownById,
    createOder,
    getOderById
}