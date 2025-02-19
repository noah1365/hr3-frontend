import React, { useEffect } from 'react';

const IncentiveHistory = () => {
  const incentives = [
    {
      _id: '1',
      incentiveName: 'Performance Bonus',
      incentiveDescription: 'A bonus awarded for exceeding performance targets.',
      incentiveType: 'Monetary',
      dateGranted: '2024-09-01',
    },
    {
      _id: '2',
      incentiveName: 'Extra Vacation Days',
      incentiveDescription: 'Additional vacation days granted as a reward.',
      incentiveType: 'Time Off',
      dateGranted: '2024-08-15',
    },
    {
      _id: '3',
      incentiveName: 'Employee of the Month',
      incentiveDescription: 'Recognition for outstanding contribution in the month.',
      incentiveType: 'Recognition',
      dateGranted: '2024-07-20',
    },
  ];
  useEffect(() => {
    document.title = "Incentives History";
  });
  return (
    <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
      <h2 className="text-2xl font-semibold mb-4">Incentive History</h2>
      <table className="table w-full mb-4">
        <thead>
          <tr className="bg-primary text-white">
            {/* Table headers */}
            <th className="border px-4 py-2">Incentive Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Incentive Type</th>
            <th className="border px-4 py-2">Date Granted</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(incentives) && incentives.length > 0 ? (
            incentives.map((incentive) => (
              <tr key={`${incentive._id}-${incentive.incentiveName}`} className="hover:bg-neutral hover:text-white">
                <td className="border px-4 py-2">{incentive.incentiveName || 'N/A'}</td>
                <td className="border px-4 py-2">{incentive.incentiveDescription || 'N/A'}</td>
                <td className="border px-4 py-2">{incentive.incentiveType || 'N/A'}</td>
                <td className="border px-4 py-2">{incentive.dateGranted || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No incentives found!</td>
            </tr>
          )}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default IncentiveHistory;
