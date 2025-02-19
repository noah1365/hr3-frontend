import React, { useState, useEffect } from 'react';
import { useEmployeeStore } from '../store/employeeStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResendVerification = () => {
    const {resendVerification,message,error} = useEmployeeStore();
    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const success = await resendVerification(email);
            if(success){
                setEmail('');
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Resend Verification';
        if(message){
            toast.success(message);
        }
        if(error){
            toast.error(error);
        }
    }, [message, error]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Resend Verification Email</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
                        {loading ? 'Sending...' : 'Resend Verification Email'}
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ResendVerification;
