import User from "../../model/user";
import { hash } from "bcryptjs";
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, $data: true, });

const userValidationSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            format:'email',
            minLength: 3
        },
        username: {
            type: 'string',
            minLength: 3,
        },
        password: {
            type: 'string',
            minLength: 6,
        },
        confirmPassword: {
            type: 'string',
            minLength: 6,
            const: { $data: '1/password' },
        },
    },
    required: ['name', 'username', 'password', 'confirmPassword'],
    additionalProperties: true,
};

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'POST':
            if (!ajv.validate(userValidationSchema, req.body)) {
                return res.status(400).json({ errors: ajv.errors });
            }
            //Hashing Password
            req.body.password = await hash(req.body.password, 12)
            User.RegisterUser(req.body, (err, data) => {
                err ? res.status(400).send(err) : res.status(201).json({ success: true, msg: "Registration success!!" })
            });
            break
        default:
            res.status(405).json({ error: "Bad Method Called!!" })
            break
    }
}