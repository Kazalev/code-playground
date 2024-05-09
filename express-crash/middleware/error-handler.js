const errorHandler = (error, req, res, next) => {
    const statusCode = error.status ? error.status : 500
    res.status(statusCode).json({ msg: error.message })
}

export default errorHandler
