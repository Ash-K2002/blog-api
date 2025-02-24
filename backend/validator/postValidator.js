import { body } from "express-validator";

const createValidator=[
    body('title')
    .notEmpty()
    .withMessage("The title must not be empty")
    .isLength({max: 100})
    .withMessage('Title length must be less than or equal to 100'),

    body('content')
    .optional(),

];

const updateValidator=[
    body('title')
    .optional()
    .notEmpty()
    .withMessage("The title must not be empty")
    .isLength({max: 100})
    .withMessage('Title length must be less than or equal to 100'),

    body('content')
    .optional(),
];

const postValidator={
    createValidator,
    updateValidator,
}

export default postValidator;