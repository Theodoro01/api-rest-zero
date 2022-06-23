import { body, validationResult } from "express-validator"

const validateRouteUsers = () => {
    return [
        body('name').notEmpty().withMessage('O campo nome é obrigatório'),
        body('email').notEmpty().withMessage('O campo email é obrigatório'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('O campo email não contém um email válido'),
        body('password').notEmpty().withMessage('O campo senha é obrigatório')
    ]
}

const validateResultUsers = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors
    })
}

const validateRouteLogin = () => {
    return [
        body('email').notEmpty().withMessage('O campo email é obrigatório'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('O campo email não contém um email válido'),
        body('password').notEmpty().withMessage('O campo senha é obrigatório.')
    ]
}

const validateResultLogin = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors
    })
}

export default {
    validateRouteUsers,
    validateResultUsers,
    validateRouteLogin,
    validateResultLogin
}