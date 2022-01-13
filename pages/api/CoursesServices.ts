import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getCourses(req: NextApiRequest, res: NextApiResponse) {
    axios.get(`${process.env.STRAPI_URL}/api/courses`).then(response => {
        res.json({ message: response.data.data })
    })
    .catch(error => {
        res.status(500).json({ error: error.response.data.error.message })
    });
}