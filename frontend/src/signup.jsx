import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [society, setSociety] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [selectedAddressOption, setSelectedAddressOption] = useState('currentLocation');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // Validate if passwords match
        if (password !== confirmPassword) {
            Swal.fire("Error", "Passwords do not match!", "error");
            setPassword('');
            setConfirmPassword('');
            return;
        }
    
        // Validate contactNo is not empty
        if (!contactNo) {
            Swal.fire("Error", "Contact number is required!", "error");
            return;
        }
    
        // Prepare the address data based on selected option
        let addressData;
        if (selectedAddressOption === 'manual') {
            addressData = {
                houseNo,
                society,
                streetAddress,
                landmark,
                city,
                state,
                pincode
            };
        } else {
            addressData = {
                houseNo,
                society,
                latitude,
                longitude
            };
        }
    
        // Prepare the user data to send to the backend
        const userData = {
            email,
            password,
            fname,
            lname,
            contactNo,
            address: addressData
        };
    
        console.log(userData); // Log the data to ensure contactNo is being sent
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
    
            if (response.data.success) {
                Swal.fire("Success", "Account created successfully!", "success").then(() => {
                    window.location.href = '/login';
                });
            } else {
                Swal.fire("Error", response.data.message || "Sign up failed. Please try again.", "error");
            }
        } catch (error) {
            console.error("Sign up error:", error);
            Swal.fire("Error", error.response?.data?.message || "Something went wrong. Please try again later.", "error");
        }
    };
    

    useEffect(() => {
        if (selectedAddressOption === 'currentLocation') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        console.error(error.message);
                    }
                );
            }
        }
    }, [selectedAddressOption]);

    const handleAddressOptionChange = (e) => {
        setSelectedAddressOption(e.target.value);
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="card-title">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="Fname" className="form-label">First Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="Fname" value={fname} onChange={(e) => setFname(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Lname" className="form-label">Last Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="Lname" value={lname} onChange={(e) => setLname(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Contact" className="form-label">Contact <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="Contact" value={contactNo} onChange={(e) => setContactNo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="houseNo" className="form-label">House No. <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="houseNo" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="society" className="form-label">Place <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="society" value={society} onChange={(e) => setSociety(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address Option</label>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="addressOption" value="currentLocation" checked={selectedAddressOption === 'currentLocation'} onChange={handleAddressOptionChange} />
                            <label className="form-check-label">Use Current Location</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="addressOption" value="manual" checked={selectedAddressOption === 'manual'} onChange={handleAddressOptionChange} />
                            <label className="form-check-label">Enter Manual Address</label>
                        </div>
                    </div>
                    {selectedAddressOption === 'manual' && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="streetAddress" className="form-label">Street Address</label>
                                <input type="text" className="form-control" id="streetAddress" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="landmark" className="form-label">Landmark</label>
                                <input type="text" className="form-control" id="landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pincode" className="form-label">Pincode</label>
                                <input type="text" className="form-control" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                            </div>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
