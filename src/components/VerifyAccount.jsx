import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEmployeeStore } from '../store/employeeStore';
import { useParams, useNavigate, Link } from 'react-router-dom';

const VerifyAccount = () => {
    const {verifyAccount} = useEmployeeStore();
    const {token} = useParams();
    const navigate = useNavigate();
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    
    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await verifyAccount(token);
                if(response.message === "Invalid token."){
                    toast.error('Invalid token! Redirecting...');
                    setTimeout(() => navigate('/'), 3000);
                }
            } catch (error) {
                console.error("Error during token validation:", error);
                toast.error('Error occurred during token validation. Redirecting...');
                setTimeout(() => navigate('/'), 3000);
            }
        };

        if (token) {
            validateToken();
        }
    }, [token, navigate, verifyAccount]);

    const validateForm = () => {
        const validationErrors = [];
        if(!newPassword){
            validationErrors.push('New password is required.');
        }else if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/.test(newPassword)){
            validationErrors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        }
        if(!confirmPassword){
            validationErrors.push('Confirm password is required.');
        }else if(newPassword !== confirmPassword){
            validationErrors.push('Passwords do not match.');
        }
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = validateForm();
        if(errors.length > 0){
            errors.forEach(error => toast.error(error));
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await verifyAccount(token, newPassword, confirmPassword);
            if(response.status === true) {
                toast.success('Password reset successfully!');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            }else if(response.message === "Token has expired."){
                toast.error('Token has expired! Redirecting...');
                setTimeout(() => {
                    navigate('/resend-verification');
                }, 3000);
            }else if(response.message === "Invalid token."){
                toast.error('Invalid token! Redirecting...');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }else if(response.message === "Password has already been reset."){
                toast.error('Password has already been reset! Redirecting...');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            if(error.response && error.response.data.message){
                toast.error(error.response.data.message || 'An error occurred. Please try again later.');
            }else{
                toast.error('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(()=> {
        document.title = 'Verify Account';
    });

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Verify Your Account</h2>
                <p>Create new password to verify your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">New Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button type="button" onClick={() => setShowPassword(prev => !prev)} className="mb-4 text-blue-600 hover:underline">
                        {showPassword ? 'Hide Passwords' : 'Show Passwords'}
                    </button>
                    <button type="submit" className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold rounded-md hover:bg-blue-700`} disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        {`If your token has expired, `}
                        <Link to="/resend-verification"className="text-blue-600 hover:underline">request a new one</Link>.
                    </p>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default VerifyAccount;
