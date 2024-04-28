import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
        .then(res=>{
            if(res.data.Status === "Success"){
                navigate('/login');
            }
            else{
                alert("Error in handleSubmit in register");
            }
        })
        .then(err => console.log("--->Error in handlesubmit"+err));
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h3 className="card-title">Sign Up</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control rounded-0" placeholder="Enter Name" name="name" onChange={e => setValues({...values, name:e.target.value})} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control rounded-0" placeholder="Enter Email" name="email" onChange={e => setValues({...values, email:e.target.value})} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control rounded-0" placeholder="Enter Password" name="password" onChange={e => setValues({...values, password:e.target.value})} required />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold">Sign Up</button>
                                </div>
                                <div className="mt-3 text-center">
                                    <p>By signing up, you agree to our <a href="#" className="text-primary">terms and policies</a>.</p>
                                </div>
                                <div className="d-grid gap-2">
                                    <Link to="/login" className="btn btn-primary btn-lg rounded-pill fw-bold">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
