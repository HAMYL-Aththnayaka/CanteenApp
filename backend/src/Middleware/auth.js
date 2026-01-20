import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).send({
                success: false,
                alert: 'Not authorized'
            })
        }

        const tokenCheck = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        req.body = req.body || {};
        req.body.userId = tokenCheck.id;
        req.body.userName = tokenCheck.name;
        next();

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            alert: err.toString()
        })
    }

}


export default authMiddleware