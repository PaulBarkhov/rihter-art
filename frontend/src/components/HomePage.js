import React from 'react'

function HomePage() {
    const [courses, setCourses] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            await fetch('http://192.168.2.114:8000/get_courses')
                .then(res => res.json())
                .then(data => setCourses(data))
        }
        fetchData()

    }, [])
    return (
        <div>
            <h1>HomePage</h1>
            {courses && courses.map(course => {
                return (
                    <>
                        <h2>{course.name}</h2>
                        <img src={course.preview} alt="preview" />
                    </>

                )
            })}
        </div>
    )
}

export default HomePage
