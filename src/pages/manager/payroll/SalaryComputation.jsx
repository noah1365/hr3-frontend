import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const initialSalaryData = [
    { id: 1, name: "John Lloyd", hourlyRate: 80, workingHoursPerDay: 8, bonuses: 5000, deductions: 1630, startDate: "2024-11-01", overtimeHours: 10 },
    { id: 2, name: "Oliver", hourlyRate: 90, workingHoursPerDay: 8, bonuses: 4000, deductions: 1500, startDate: "2024-11-01", overtimeHours: 5 },
    { id: 3, name: "Abby", hourlyRate: 85, workingHoursPerDay: 8, bonuses: 6000, deductions: 2500, startDate: "2024-11-01", overtimeHours: 8 },
];

const SalaryComputation = () => {
    const [salaryData, setSalaryData] = useState(initialSalaryData);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const calculateDaysWorked = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDifference = end - start;
        return Math.ceil(timeDifference / (1000 * 3600 * 24));
    };

    const calculateSalary = (employee) => {
        const totalDaysWorked = calculateDaysWorked(employee.startDate, new Date());
        const dailyRate = employee.hourlyRate * employee.workingHoursPerDay;
        const earnedSalary = dailyRate * totalDaysWorked;

        const overtimeRate = employee.hourlyRate * 1.5; // 1.5x hourly rate for overtime
        const overtimePay = employee.overtimeHours * overtimeRate;

        const netSalary = earnedSalary + employee.bonuses + overtimePay - employee.deductions;
        return { totalDaysWorked, earnedSalary, overtimePay, netSalary };
    };

    const filteredSalaryData = salaryData.filter(employee => {
        const employeeDate = new Date(employee.startDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (!startDate || employeeDate >= start) && (!endDate || employeeDate <= end);
    });

    useEffect(() => {
        document.title = 'Salary Structure Overview';
    }, []);

    return (
        <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
            <h1 className="text-center text-3xl font-bold mb-4">Salary Structure Overview</h1>

            <div className="mb-4 flex flex-col items-center">
                <h2 className="text-lg mb-1">Filter by Date</h2>
                <div className="md:flex-row items-center justify-center gap-2">
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="input input-bordered w-1/2 md:w-1/3 h-8 text-sm p-1"
                    />
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="input input-bordered w-1/2 md:w-1/3 h-8 text-sm p-1"
                    />
                </div>
            </div>

            <h2 className="text-xl mb-2">Salary Details</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Employee Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Hourly Rate</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Working Hours/Day</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Total Days Worked</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Base Salary (Earned)</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Overtime Hours</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Overtime Pay</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Bonuses</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Deductions</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Net Salary</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Start Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaryData.map(employee => {
                            const { totalDaysWorked, earnedSalary, overtimePay, netSalary } = calculateSalary(employee);
                            return (
                                <tr key={employee.id} className="hover:bg-neutral hover:text-white">
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.name}</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{employee.hourlyRate.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.workingHoursPerDay} hrs</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{totalDaysWorked} days</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{earnedSalary.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.overtimeHours} hrs</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{overtimePay.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{employee.bonuses.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{employee.deductions.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-left text-xs uppercase tracking-wider font-bold text-green-500">₱{netSalary.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{new Date(employee.startDate).toLocaleDateString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalaryComputation;
