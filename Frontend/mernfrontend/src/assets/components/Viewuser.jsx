import React, { useState, useEffect } from 'react';
import { BsTrash3, BsDatabaseUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Viewuser = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            // const api = process.env.REACT_APP_API;
            const api = 'http://localhost:5000/getusers';
            const responce = await axios.get(api);
            const data = responce.data.data;
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        const api = `http://localhost:5000/deleteuser/${id}`;
        try {
            const responce = await axios.delete(api);
            console.log(responce)
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="container">
                <h1 className="text-center">User Registeration </h1>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/adduser">
                        <button className="btn btn-sm btn-primary">
                            AddUser
                        </button>
                    </Link>
                    <button className="btn btn-sm btn-danger">EditUser</button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User Name</th>
                            <th scope="col">User Phone</th>
                            <th scope="col">User Email</th>
                            <th scope="col">User Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, i) => {
                            return (
                                <>
                                    <tr key={user.id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{user.username}</td>
                                        <td>{user.useremail}</td>
                                        <td>{user.usermobile}</td>
                                        <td>{user.useraddress}</td>
                                        <td className="d-flex justify-content-around align-items-center">
                                            <Link to={`/edituser/${user._id}`}>
                                                <button className="btn btn-warning btn-sm text-white">
                                                    <BsDatabaseUp />
                                                </button>
                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    deleteUser(user._id)
                                                }>
                                                <BsTrash3 />
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Viewuser;
