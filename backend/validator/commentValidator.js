import { body } from "express-validator";

const createValidator =[
    body('content')
    .trim()
    .notEmpty()
    .withMessage('The content must not be empty')
    .isLength({
        max: 500
    })
    .withMessage('The length must not exceed 500'),

    body('userId')
    .trim()
    .notEmpty()
    .withMessage('The user id must not be empty')
    .isNumeric()
    .withMessage('The user id must be a number'),

    body('blogId')
    .trim()
    .notEmpty()
    .withMessage('The blog id must not be empty')
    .isNumeric()
    .withMessage('The blog id must be a number'),
]

const updateValidator=[
    body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('The content must not be empty')
    .isLength({
        max: 500
    })
    .withMessage('The length must not exceed 500'),
]

const commentValidator = {
    createValidator,
    updateValidator,
}
export default commentValidator;