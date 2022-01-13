import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function loginUser(req: NextApiRequest, res: NextApiResponse) {
    const { password, username } = req.body
    axios.post(`${process.env.STRAPI_URL}/api/auth/local`, {
        identifier: username,
        password: password,
    }).then(response => {
        console.log(response)
        res.json({ message: response.data.jwt })
    })
    .catch(error => {
        res.status(500).json({ error: error.response.data.error.message })
    });
}