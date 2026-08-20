export class ApiError extends Error {
    statusCode: number;
    errors?: unknown;

    constructor(message: string, statusCode = 500, errors?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(message = 'Solicitud inválida', errors?: unknown) {
        return new ApiError(message, 400, errors);
    }

    static unauthorized(message = 'No autorizado', errors?: unknown) {
        return new ApiError(message, 401, errors);
    }

    static notFound(message = 'No encontrado', errors?: unknown) {
        return new ApiError(message, 404, errors);
    }

    static conflict(message = 'Solicitud en conflicto', errors?: unknown) {
        return new ApiError(message, 409, errors);
    }

    static toManyRequests(message = 'Muchas peticiones', errors?: unknown) {
        return new ApiError(message, 429, errors);
    }

    static internal(message = 'Error interno del servidor', errors?: unknown) {
        return new ApiError(message, 500, errors);
    }
}
