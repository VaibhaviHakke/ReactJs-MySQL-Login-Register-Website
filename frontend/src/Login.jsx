import React, { useState }from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [values, setValues] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res=>{
            if(res.data.Status === "Success"){
                navigate('/');
            }
            else{
                alert(res.data.Error);
            }
        })
        .then(err => {
            console.log("-->Error in handlesubmit in login" , err)
        });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h3 className="card-title">Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit = {handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control rounded-0" placeholder="Enter Email" name="email" onChange={e => setValues({...values, email:e.target.value})} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control rounded-0" placeholder="Enter Password" name="password" onChange={e => setValues({...values, password:e.target.value})} required />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold">Login</button>
                                </div>
                                <div className="mt-3 text-center">
                                    <p>you agree to our <a href="#" className="text-primary">terms and policies</a>.</p>
                                </div>
                                <div className="d-grid gap-2">
                                    <Link to="/register" className="btn btn-primary btn-lg rounded-pill fw-bold">Create Account</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
