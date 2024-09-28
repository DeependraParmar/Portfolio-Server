import requestIp from "request-ip";

export const ipMiddleware = (req, res, next) => {
    const clientIP = requestIp.getClientIp(req);
    next();
}