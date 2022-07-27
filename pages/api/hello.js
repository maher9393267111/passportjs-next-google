// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from 'next-connect'
import dbConnect from '../../lib/database'
import {authMiddleware,hello} from '../../lib/authmiddleware'

const handler = nc();
dbConnect();


handler
   .use(authMiddleware)
    .get(hello)

export default handler;