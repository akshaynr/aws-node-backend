const INTERNAL_SERVER_ERROR = {
    statusCode: 500,
    message: 'Internal Server Error'
}

const NOT_FOUND = {
    statusCode: 404,
    message: 'Product Not Found'
}

const BAD_REQUEST = {
    statusCode: 400,
    message: 'Invalid Details'
}

module.exports = {
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    BAD_REQUEST
}