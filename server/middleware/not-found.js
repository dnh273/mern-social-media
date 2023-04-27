const notFoundMiddleware = (req, res) => res.status(404).send('Route does not exits')

module.exports = notFoundMiddleware 