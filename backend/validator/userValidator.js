import { body } from "express-validator";

const createValidator=
[
    body('username')
    .isLength({min:1, max:100})
    .withMessage("Username must have length 1-100"),

    body('password')
    .isLength({min:5, max:100})
    .withMessage("Password must be 5-100 characters long"),

    body('role')
    .notEmpty()
    .withMessage('Role must not be empty'),
];

const updateValidator=[
    body('password')
    .optional()
    .isLength({min:1, max: 100})
    .withMessage("Password must be of length 5-100"),

    body('role')
    .optional()
    .notEmpty()
    .withMessage('Role must not be empty'),
]

const userValidator={
    createValidator,
    updateValidator,
}
export default userValidator;