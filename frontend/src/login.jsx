import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Login.css'; // Your CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!email || !password) {
            Swal.fire("Error", "Please enter both email and password.", "error");
            return;
        }

        const userData = {
            email,
            password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', userData);

            if (response.data.success) {
                // Store JWT token in localStorage (you can also store it in cookies for better security)
                localStorage.setItem('authToken', response.data.token);
                Swal.fire("Success", "Login successful!", "success").then(() => {
                    // Redirect to home page or dashboard after successful login
                    window.location.href = '/dashboard'; // Adjust the redirect path as needed
                });
            } else {
                Swal.fire("Error", response.data.message || "Login failed. Please try again.", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire("Error", error.response?.data?.message || "Something went wrong. Please try again later.", "error");
        }
    };

    return (
        <div className="login-page">
            <div className="card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
