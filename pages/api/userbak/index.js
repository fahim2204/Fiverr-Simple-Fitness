import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";
import Post from "../../../model/post";
import Comment from "../../../model/comment";
import { validateToken } from "../../../middleware/auth";
import { hash } from "bcryptjs";
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, $data: true, });


const userValidationSchema = {
    type: 'object',
    properties: {
        fullName: {
            type: 'string',
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
    required: ['fullName', 'username', 'password', 'confirmPassword'],
    additionalProperties: false,
};

export default async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            validateToken(req, res, async () => {
                await User.find({}).then((x) => { return res.status(200).json({ success: true, data: x }) }
                ).catch(e => {
                    return res.status(500).json({ success: false, data: e })
                })
            })
            break
        case 'POST':
            if (!ajv.validate(userValidationSchema, req.body)) {
                return res.status(400).json({ errors: ajv.errors });
            }
            req.body.password = await hash(req.body.password, 12)
            await User.create(req.body).then(() =>
                res.status(201).json({ success: true, msg: "Registration success!!" })
            ).catch(err =>
                res.status(400).json({ error: err, msg: "Something wrong!!" })
            )
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}