import React, { useState, useEffect } from 'react'

const Home = () => {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
    // const show = true;

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch (err) {
            console.log(err);
            // history.push('/login');
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);
    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">Welcome</p>
                    <h1>{userName}</h1>
                    <h2>{show ? 'Happy to see you back' : 'We Are The MERN Developer'}</h2>
                </div>
            </div>
        </>
    )
}

export default Home
