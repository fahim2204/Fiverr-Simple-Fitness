import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";
import Post from "../../../model/post";
import Comment from "../../../model/comment";
import { validateToken } from "../../../middleware/auth";


export default async (req, res) => {
    const { username } = req.query
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            validateToken(req, res, async () => {
                await User.findOne({username}).select('-password').select('-token').then((x) => { 
                    // x.password = undefined;
                    return res.status(200).json({ success: true, data: x }) }
                ).catch(e => {
                    return res.status(500).json({ success: false, data: e })
                })
            })
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}