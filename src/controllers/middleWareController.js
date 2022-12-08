import jwt, { verify } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const middleWareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ASSESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid")
                }
                req.user = user;
                next()
            })
        } else {
            res.status(401).json("You are not authenticated")
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ASSESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid")
                } else {
                    if (user.roleId === "ADMIN") {
                        req.user = user;
                        next()
                    } else {
                        res.status(401).json("You are not admin")
                    }

                }

            })
        } else {
            res.status(401).json("You are not authenticated")
        }
    },

};

export default middleWareController