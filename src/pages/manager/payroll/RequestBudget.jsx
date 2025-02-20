import React, { useEffect, useState, useRef } from 'react';

const RequestBudget = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [reason, setReason] = useState('');
  const [budgetRequests, setBudgetRequests] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!file){
      setError('Please upload a supporting document for the budget request.');
      return;
    }

    if(!reason){
      setError('Please provide a reason for the budget request.');
      return;
    }

    const newRequest = {
      id: budgetRequests.length + 1,
      date: new Date().toLocaleDateString(),
      reason,
      status: 'Pending',
      file,
    };

    setBudgetRequests((prevRequests) => [...prevRequests, newRequest]);

    setFile(null);
    setReason('');
    setError('');
    fileInputRef.current.value = '';
  };

  useEffect(() => {
    document.title = 'Request Budget';
  }, []);
  
  return (
    <div className="p-6 bg-white shadow-md mt-10 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Request Budget for Payroll</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <label htmlFor="file" className="block mb-2 font-medium text-gray-700">Supporting Document</label>
          <input
            ref={fileInputRef}
            id="file"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required 
          />
        </div>

        <div>
          <label htmlFor="reason" className="block mb-2 font-medium text-gray-700">Reason for Budget Request</label>
          <textarea
            id="reason"
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Please provide a detailed reason for the budget request..."
            required 
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200">
          Submit Request
        </button>
      </form>

      {/* Budget Requests Table */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Submitted Budget Requests</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Reason</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {budgetRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-300 hover:text-white">
                <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{request.id}</td>
                <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{request.date}</td>
                <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{request.reason}</td>
                <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestBudget;
