import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    const { email, password, username } = req.body
    axios
        .post(`${process.env.STRAPI_URL}/api/users`, {
            username,
            email,
            password,
        })
        .then(response => {
            res.json({ message: response.statusText })
        })
        .catch(error => {
            res.status(500).json({ error: error.response.data.error.message })
        });
}