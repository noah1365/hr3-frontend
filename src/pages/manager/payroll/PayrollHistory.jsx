import React, { useState, useEffect } from 'react';

const PayrollHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPayrollHistory = async () => {
      const sampleHistoryData = [
        { employeeName: 'John Lloyd', salary: 30000, paymentMethod: 'Cash', status: 'Approved', date: '2024-08-31' },
        { employeeName: 'Oliver', salary: 32000, paymentMethod: 'GCash', status: 'Approved', date: '2024-08-30' },
        { employeeName: 'Padit', salary: 32000, paymentMethod: 'GCash', status: 'Approved', date: '2024-08-30' },
      ];
      setHistoryData(sampleHistoryData);
    };
    fetchPayrollHistory();
  }, []);

  const filteredData = historyData.filter(data => {
    const dateMatch = (!startDate || new Date(data.date) >= new Date(startDate)) &&
                     (!endDate || new Date(data.date) <= new Date(endDate));
    const nameMatch = data.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    return dateMatch && nameMatch;
  });

  const downloadCSV = () => {
    const csvData = filteredData.map(({ employeeName, salary, paymentMethod, status, date }) => ({
      'Employee Name': employeeName,
      Salary: `₱${salary.toFixed(2)}`,
      'Payment Method': paymentMethod,
      Status: status,
      Date: date,
    }));

    const csvRows = [
      ['Employee Name', 'Salary', 'Payment Method', 'Status', 'Date'], // Header row
      ...csvData.map(row => [
        row['Employee Name'],
        row['Salary'],
        row['Payment Method'],
        row['Status'],
        row['Date'],
      ]),
    ];

    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'payroll_history.csv');
    a.style.visibility = 'hidden';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    document.title = 'Payroll History';
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Payroll History</h1>

      <div className="mb-4">
        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <label className="block mb-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <input
          type="text"
          placeholder="Search by employee name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <button onClick={downloadCSV} className="bg-primary text-white rounded p-2 mb-4">
        Download History
      </button>

      {filteredData.length > 0 ? (
        <table className="table table-auto w-full border">
          <thead>
            <tr className="bg-primary text-white">
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Payment Method</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index} className="hover:bg-neutral hover:text-white">
                <td className="border px-4 py-2">{data.employeeName}</td>
                <td className="border px-4 py-2">₱{data.salary.toFixed(2)}</td>
                <td className="border px-4 py-2">{data.paymentMethod}</td>
                <td className="border px-4 py-2">{data.status}</td>
                <td className="border px-4 py-2">{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payroll history found for the selected filters.</p>
      )}
    </div>
  );
};

export default PayrollHistory;
