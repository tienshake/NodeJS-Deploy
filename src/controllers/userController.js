import userServices from '../services/userServices';


let refreshTokens = []

const handleRefreshToken = async (req, res) => {
    const resFreshToken = req.cookies.refreshToken
    const data = await userServices.handleRefreshToken(resFreshToken);
    const newRefreshToken = data.newRefreshToken

    if (!refreshTokens.includes(resFreshToken)) {
        return res.status(200).json({
            errCode: 3,
            errMessage: "Refresh Token is valid",
        })
    }

    refreshTokens = refreshTokens.filter(token => token !== resFreshToken)

    refreshTokens.push(newRefreshToken)

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict"
    })

    return res.status(200).json({
        errCode: 0,
        errMessage: "Oke",
        accessToken: data.newAccessToken
    })

};



const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    const userData = await userServices.handleUserLogin(email, password)
    const data = { ...userData.user, token: userData.token }
    const refreshToken = userData.refreshToken

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict"
    })

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user && data ? data : {},
        refreshToken: refreshToken
    })
};

const handleLogout = async (req, res) => {
    try {
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Logout Oke'
        })
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }


};


const handleCreateItemAllCode = async (req, res) => {
    try {
        const message = await userServices.handleCreateItemAllCode(req.body);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const createUserController = async (req, res) => {
    try {
        const message = await userServices.createUserServices(req.body);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const register = async (req, res) => {
    try {
        const message = await userServices.createUserServices(req.body);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};


const handleDeleteUserById = async (req, res) => {
    try {
        const id = req.query.id
        const message = await userServices.handleDeleteUserById(id);
        return res.status(200).json(message)
    } catch (e) {
        console.log('create error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};

const handleGetAllUseController = async (req, res) => {
    const id = req.query.id;
    const limit = req.query.limit;
    const page = req.query.page;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'missing require parameter',
            user: {}
        })
    }

    const data = await userServices.getAllUserServices(id, +limit, +page)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        data: data && data.users ? data.users : {},
        count: data && data.countData ? data.countData : ''
    })
};
const handleAllCode = async (req, res) => {
    try {
        const data = await userServices.getAllCodeServices(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const handleGetUserById = async (req, res) => {
    try {
        const data = await userServices.handleGetUserById(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log('err from error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};
const createUserCloneController = async (req, res) => {
    try {
        const dataUser = req.body.dataUser;
        const dataOderProduct = req.body.dataOderProduct;
        const message = await userServices.createUserCloneController(dataUser, dataOderProduct);
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
    createUserController,
    handleGetAllUseController,
    handleLogin,
    handleAllCode,
    handleGetUserById,
    createUserCloneController,
    handleRefreshToken,
    handleLogout,
    handleCreateItemAllCode,
    handleDeleteUserById,
    register
}