import React, { useEffect } from 'react';

const MyOvertimeBonuses = () => {
  const overtimeData = [
    {
      date: "October 1, 2024",
      hours: 5,
      rate: 150,
      bonus: 500,
    },
    {
      date: "October 2, 2024",
      hours: 3,
      rate: 150,
      bonus: 300,
    },
  ];

  // Calculate total overtime, total bonuses, total overtime pay, and total hours
  const totalOvertime = overtimeData.reduce((acc, item) => acc + item.hours * item.rate, 0);
  const totalBonus = overtimeData.reduce((acc, item) => acc + item.bonus, 0);
  const totalOvertimePay = overtimeData.reduce((acc, item) => acc + item.hours * item.rate, 0);
  const totalHours = overtimeData.reduce((acc, item) => acc + item.hours, 0); // Total hours calculation

  useEffect(() => {
    document.title = "My Overtime and Bonuses";
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Overtime & Bonuses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="card bg-base-100 shadow-lg rounded-lg transition-transform transform hover:scale-105">
          <div className="card-body">
            <h2 className="card-title text-lg sm:text-xl font-semibold">Total Overtime</h2>
            <p className="text-lg font-bold text-green-600">₱{totalOvertime.toLocaleString()}</p>
            <p className="text-md font-medium text-gray-600">Total Hours: {totalHours}</p> {/* Total hours display */}
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg rounded-lg transition-transform transform hover:scale-105">
          <div className="card-body">
            <h2 className="card-title text-lg sm:text-xl font-semibold">Total Bonuses</h2>
            <p className="text-lg font-bold text-green-600">₱{totalBonus.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Overtime Records</h2>
      <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Hours</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Rate</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Bonus</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Overtime Pay</th>
          </tr>
        </thead>
        <tbody>
          {overtimeData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-300 hover:text-white">
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{item.date}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{item.hours}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{item.rate.toLocaleString()}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{item.bonus.toLocaleString()}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{(item.hours * item.rate).toLocaleString()}</td> {/* Overtime Pay for each record */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOvertimeBonuses;
