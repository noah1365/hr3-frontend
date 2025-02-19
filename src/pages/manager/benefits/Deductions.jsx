import React, { useEffect, useState } from 'react';

const employeesData = [
    {
        name: 'John Lloyd',
        benefits: [
            {
                planName: 'PhilHealth',
                type: 'Health Insurance',
                deduction: 300,
                description: 'Government-mandated health insurance program.',
                contributionHistory: [
                    { date: '2024-01-01', month: 'January', amount: 300 },
                    { date: '2024-02-01', month: 'February', amount: 300 },
                    { date: '2024-03-01', month: 'March', amount: 300 },
                    { date: '2024-04-01', month: 'April', amount: 300 },
                    { date: '2024-05-01', month: 'May', amount: 300 },
                    { date: '2024-06-01', month: 'June', amount: 300 },
                    { date: '2024-07-01', month: 'July', amount: 300 },
                    { date: '2024-08-01', month: 'August', amount: 300 },
                    { date: '2024-09-01', month: 'September', amount: 300 },
                    { date: '2024-10-01', month: 'October', amount: 300 },
                    { date: '2024-11-01', month: 'November', amount: 300 },
                    { date: '2024-12-01', month: 'December', amount: 300 },
                ],
            },
            {
                planName: 'Health Insurance',
                type: 'Health Insurance',
                deduction: 500,
                description: 'Private health insurance.',
                contributionHistory: [
                    { date: '2024-01-01', month: 'January', amount: 500 },
                    { date: '2024-02-01', month: 'February', amount: 500 },
                    { date: '2024-03-01', month: 'March', amount: 500 },
                    { date: '2024-04-01', month: 'April', amount: 500 },
                    { date: '2024-05-01', month: 'May', amount: 500 },
                    { date: '2024-06-01', month: 'June', amount: 500 },
                    { date: '2024-07-01', month: 'July', amount: 500 },
                    { date: '2024-08-01', month: 'August', amount: 500 },
                    { date: '2024-09-01', month: 'September', amount: 500 },
                    { date: '2024-10-01', month: 'October', amount: 500 },
                    { date: '2024-11-01', month: 'November', amount: 500 },
                    { date: '2024-12-01', month: 'December', amount: 500 },
                ],
            },
            {
                planName: 'SSS',
                type: 'Retirement Benefits',
                deduction: 500,
                description: 'Withhold and contribute for retirement, disability, and death benefits.',
                contributionHistory: [
                    { date: '2024-01-01', month: 'January', amount: 500 },
                    { date: '2024-02-01', month: 'February', amount: 500 },
                    { date: '2024-03-01', month: 'March', amount: 500 },
                    { date: '2024-04-01', month: 'April', amount: 500 },
                    { date: '2024-05-01', month: 'May', amount: 500 },
                    { date: '2024-06-01', month: 'June', amount: 500 },
                    { date: '2024-07-01', month: 'July', amount: 500 },
                    { date: '2024-08-01', month: 'August', amount: 500 },
                    { date: '2024-09-01', month: 'September', amount: 500 },
                    { date: '2024-10-01', month: 'October', amount: 500 },
                    { date: '2024-11-01', month: 'November', amount: 500 },
                    { date: '2024-12-01', month: 'December', amount: 500 },
                ],
            },
        ],
    },
    {
        name: 'Oliver',
        benefits: [
            {
                planName: 'PhilHealth',
                type: 'Health Insurance',
                deduction: 250,
                description: 'Government-mandated health insurance program.',
                contributionHistory: [
                    { date: '2024-01-01', month: 'January', amount: 250 },
                    { date: '2024-02-01', month: 'February', amount: 250 },
                    { date: '2024-03-01', month: 'March', amount: 250 },
                    { date: '2024-04-01', month: 'April', amount: 250 },
                    { date: '2024-05-01', month: 'May', amount: 250 },
                    { date: '2024-06-01', month: 'June', amount: 250 },
                    { date: '2024-07-01', month: 'July', amount: 250 },
                    { date: '2024-08-01', month: 'August', amount: 250 },
                    { date: '2024-09-01', month: 'September', amount: 250 },
                    { date: '2024-10-01', month: 'October', amount: 250 },
                    { date: '2024-11-01', month: 'November', amount: 250 },
                    { date: '2024-12-01', month: 'December', amount: 250 },
                ],
            },
            {
                planName: 'Health Insurance',
                type: 'Health Insurance',
                deduction: 400,
                description: 'Private health insurance.',
                contributionHistory: [
                    { date: '2024-01-01', month: 'January', amount: 400 },
                    { date: '2024-02-01', month: 'February', amount: 400 },
                    { date: '2024-03-01', month: 'March', amount: 400 },
                    { date: '2024-04-01', month: 'April', amount: 400 },
                    { date: '2024-05-01', month: 'May', amount: 400 },
                    { date: '2024-06-01', month: 'June', amount: 400 },
                    { date: '2024-07-01', month: 'July', amount: 400 },
                    { date: '2024-08-01', month: 'August', amount: 400 },
                    { date: '2024-09-01', month: 'September', amount: 400 },
                    { date: '2024-10-01', month: 'October', amount: 400 },
                    { date: '2024-11-01', month: 'November', amount: 400 },
                    { date: '2024-12-01', month: 'December', amount: 400 },
                ],
            },
        ],
    },
    {
        name: 'Abby',
        benefits: [
            {
                type: 'Health Insurance',
                planName: 'Pag-IBIG',
                deduction: 350,
                description: 'Government-mandated health insurance program.',
                contributionHistory: [
                    { date: '2024-01-01', month: 'January', amount: 350 },
                    { date: '2024-02-01', month: 'February', amount: 350 },
                    { date: '2024-03-01', month: 'March', amount: 350 },
                    { date: '2024-04-01', month: 'April', amount: 350 },
                    { date: '2024-05-01', month: 'May', amount: 350 },
                    { date: '2024-06-01', month: 'June', amount: 350 },
                    { date: '2024-07-01', month: 'July', amount: 350 },
                    { date: '2024-08-01', month: 'August', amount: 350 },
                    { date: '2024-09-01', month: 'September', amount: 350 },
                    { date: '2024-10-01', month: 'October', amount: 350 },
                    { date: '2024-11-01', month: 'November', amount: 350 },
                    { date: '2024-12-01', month: 'December', amount: 350 },
                ],
            },
            {
                type: 'Retirement Benefits',
                planName: 'GSIS',
                deduction: 700,
                description: 'Withhold and contribute for retirement, disability, and death benefits.',
                contributionHistory: [
                    { date: '2024-01-01', month: 'January', amount: 700 },
                    { date: '2024-02-01', month: 'February', amount: 700 },
                    { date: '2024-03-01', month: 'March', amount: 700 },
                    { date: '2024-04-01', month: 'April', amount: 700 },
                    { date: '2024-05-01', month: 'May', amount: 700 },
                    { date: '2024-06-01', month: 'June', amount: 700 },
                    { date: '2024-07-01', month: 'July', amount: 700 },
                    { date: '2024-08-01', month: 'August', amount: 700 },
                    { date: '2024-09-01', month: 'September', amount: 700 },
                    { date: '2024-10-01', month: 'October', amount: 700 },
                    { date: '2024-11-01', month: 'November', amount: 700 },
                    { date: '2024-12-01', month: 'December', amount: 700 },
                ],
            },
        ],
    },
];

const Deductions = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentBenefitHistory, setCurrentBenefitHistory] = useState([]);

    const openModal = (history) => {
        setCurrentBenefitHistory(history);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentBenefitHistory([]);
    };

    const calculateTotalDeductions = (benefits) => {
        return benefits.reduce((total, benefit) => total + benefit.deduction, 0);
    };

    const uniqueEmployees = [...new Set(employeesData.map(employee => employee.name))];

    useEffect(() => {
        document.title = 'Deductions History';
      }, []); 
    return (
        
        <div className='container mx-auto p-8 bg-base-200'>
            <h2 className="text-2xl font-bold mb-6 text-center">Deductions</h2>

            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className='bg-primary text-white'>
                        <th className="border px-4 py-2">Employee</th>
                        <th className="border px-4 py-2">Plan Name</th>
                        <th className="border px-4 py-2">Benefit Type</th>
                        <th className="border px-4 py-2">Deduction</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">View All Deductions</th>
                        <th className="border px-4 py-2">Total Deductions</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueEmployees.map(employeeName => (
                        employeesData
                            .filter(employee => employee.name === employeeName)
                            .map(employee => (
                                employee.benefits.map((benefit, index) => (
                                    <tr key={index}>
                                        {index === 0 ? (
                                            <td rowSpan={employee.benefits.length}className='hover:bg-neutral hover:text-white'>{employee.name}</td>
                                        ) : null}
                                        <td className='hover:bg-neutral hover:text-white'>{benefit.planName}</td>
                                        <td className='hover:bg-neutral hover:text-white'>{benefit.type}</td>
                                        <td className='hover:bg-neutral hover:text-white'>{benefit.deduction}</td>
                                        <td className='hover:bg-neutral hover:text-white'>{benefit.description}</td>
                                        <td>
                                            <button 
                                                onClick={() => openModal(benefit.contributionHistory)}
                                                className="btn bg-primary text-white"
                                            >
                                                View All Deductions
                                            </button>
                                        </td>
                                        <td className='hover:bg-neutral hover:text-white'>{calculateTotalDeductions(employee.benefits)}</td>
                                    </tr>
                                ))
                            ))
                    ))}
                </tbody>
            </table>

            {/* Modal to display deduction details */}
            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">Deduction History</h2>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Month</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBenefitHistory.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.date}</td>
                                        <td>{record.month}</td>
                                        <td>{record.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Deductions;
