import pkg from 'jsonwebtoken';
const {verify} = pkg;

export function checkAuth(req, res, next) {
  const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401)
        res.json({ message: 'Not Autorized bearer' })
        return
    }
    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(401)
        res.json({ message: 'Not Autorized token' })
        return
    }
    try {
        const user = verify(token, "lokman")
        req.user = user

        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({ message: 'Not Autorized catch' })
        return
    }
}

