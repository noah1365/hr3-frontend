import React, { useEffect, useState } from "react";
import { useBenefitStore } from "../../../store/benefitStore";

const Deductions = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentBenefitHistory, setCurrentBenefitHistory] = useState([]);
    const { myHistory, fetchMyBenefitDeductions, error } = useBenefitStore();

    useEffect(() => {
        fetchMyBenefitDeductions();
    }, []);

    const groupedBenefits = myHistory.reduce((acc, benefit) => {
        const benefitName = benefit.benefitsName?.benefitsName || "N/A";

        if (!acc[benefitName]) {
            acc[benefitName] = {
                benefitsName: benefitName,
                totalAmount: 0,
                history: [],
            };
        }

        acc[benefitName].totalAmount += benefit.amount || 0;
        acc[benefitName].history.push({
            createdAt: benefit.createdAt,
            amount: benefit.amount,
        });

        return acc;
    }, {});

    const benefitList = Object.values(groupedBenefits);

    const openModal = (history) => {
        setCurrentBenefitHistory(history);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentBenefitHistory([]);
    };

    return (
        <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">My Deductions</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Benefit Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Total Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">View All Deductions</th>
                    </tr>
                </thead>
                <tbody>
                    {benefitList.length > 0 ? (
                        benefitList.map((benefit, index) => (
                            <tr key={index} className="hover:bg-gray-300 hover:text-white">
                                <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{benefit.benefitsName}</td>
                                <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">₱{benefit.totalAmount.toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => openModal(benefit.history)}
                                        className="btn btn-primary"
                                    >
                                        View History
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-4">
                                No deductions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Contribution History</h3>
                        <ul className="mt-4">
                            {currentBenefitHistory.length > 0 ? (
                                currentBenefitHistory.map((history, index) => (
                                    <li key={index} className="mb-2 border-b pb-2">
                                        <strong>{new Date(history.createdAt).toLocaleDateString()}</strong> 
                                        — Amount: <span className="text-red-600">₱{history.amount.toFixed(2)}</span>
                                    </li>
                                ))
                            ) : (
                                <li>No contribution history available</li>
                            )}
                        </ul>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Deductions;
