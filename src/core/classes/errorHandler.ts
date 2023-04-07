class AppError {
    public readonly message: string
    public readonly status_code: number
    public readonly error_code: string

    constructor(message: string, statusCode = 400, errorCode = 'error') {
        this.message = message
        this.status_code = statusCode
        this.error_code = errorCode
    }
}

export default AppError