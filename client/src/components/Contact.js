import React, { useEffect, useState } from 'react'

const Contact = () => {
    // const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const userContact = async () => {
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
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            // history.push('/login');
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    // we are storing data in states

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    // send the data to backend

    const contactForm = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        })

        const data = await res.json();

        if (!data) {
            console.log("Message not send");
        } else {
            alert("Message Send");
            setUserData({ ...userData, message: "" });
        }
    }

    return (
        <>
            <div className="container_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            {/* phone number */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                {/* <img src="number" alt="..." /> */}
                                <i class="zmdi zmdi-smartphone-iphone"></i>
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +91 111 543 2198
                                    </div>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                {/* <img src="number" alt="..." /> */}
                                <i class="zmdi zmdi-email"></i>
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text">
                                        abc@abcinfotech.com
                                    </div>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                {/* <img src="number" alt="..." /> */}
                                <i class="zmdi zmdi-google-maps"></i>
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        Bangalore, KA, India.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* contact us from */}

            <div className="contact_form">
                <div className="conainer">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get in Touch
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text" id="contact_form_name"
                                            className="contact_form_name input_field"
                                            name="name"
                                            value={userData.name}
                                            onChange={handleInputs}
                                            placeholder="Your Name"
                                            required="true"
                                        />
                                        <input type="email" id="contact_form_email"
                                            className="contact_form_email input_field"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleInputs}
                                            placeholder="Your Email"
                                            required="true"
                                        />
                                        <input type="Phone" id="contact_form_phone"
                                            className="contact_form_phone input_field"
                                            name="phone"
                                            value={userData.phone}
                                            onChange={handleInputs}
                                            placeholder="Your Phone Number"
                                            required="true"
                                        />
                                    </div>
                                    <div className="contact_form_text mt-4">
                                        <textarea className="text_field contact_form_message"
                                            name="message"
                                            value={userData.message}
                                            onChange={handleInputs}
                                            placeholder="Message"
                                            cols="30" rows="10">
                                        </textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button
                                            type="submit"
                                            className="button contact_submit_button"
                                            onClick={contactForm}
                                        >Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact