import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Edituser = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });
    const fetchData = async () => {
        const api = `http://localhost:5000/getsingleusers/${id}`;
        try {
            const responce = await axios.get(api);
            if (responce.status == 200) {
                const {
                    data: { data },
                } = responce;
                console.log(data);
                setUser({
                    name: data.username,
                    phone: data.usermobile,
                    email: data.useremail,
                    address: data.useraddress,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const userData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const addUserData = async (e) => {
        e.preventDefault();
        const api = `http://localhost:5000/updateuser/${id}`;
        try {
            const responce = await axios.put(api, {
                username: user.name,
                usermobile: user.phone,
                useremail: user.email,
                useraddress: user.address,
            });

            if (responce.status == 200) {
                setUser({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                });
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="container mx-auto mt-5">
                <h1 className="text-center mb-4 bg-primary text-white w-50 mx-auto py-3 rounded text-uppercase">
                    Edit user Profile
                </h1>
                <form className="w-50 mx-auto">
                    <div className="mb-3">
                        <label className="form-label fw-bold text-uppercase ">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={user.name}
                            onChange={userData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-uppercase ">
                            Mobile
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={user.phone}
                            onChange={userData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-uppercase ">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={user.email}
                            onChange={userData}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-uppercase ">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={user.address}
                            onChange={userData}
                        />
                    </div>
                    <button
                        className="btn btn-danger w-100"
                        onClick={addUserData}>
                        Add User
                    </button>
                </form>
            </div>
        </>
    );
};

export default Edituser;
