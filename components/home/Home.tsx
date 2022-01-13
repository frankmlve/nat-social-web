import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {useTranslations} from 'next-intl';
import axios from 'axios';
import Course from '../../pages/[courseId]';

interface HomeProps { }
interface Course {
    attributes: Attributes,
    id: number
}
interface Attributes {
    name: string,
    created: Date,
    published: Date,
    updated: Date
}
const Home: FC<HomeProps> = () => {
    const t = useTranslations('home');
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(  () => {
        getCourses()
    }, [])

    async function getCourses() {
        let _courses = await axios.post("/api/CoursesServices")
        console.log(_courses.data.message)
        setCourses( [..._courses.data.message])
    }

    return (
        <div>
            <h1>{t('hello')}</h1>
            {courses.map((course, index) => {
                return (
                    <div id={course.id.toString()}>
                        <h1>{course.attributes.name}</h1>
                    </div>
                )
            })}
        </div>
    )
}
export default Home