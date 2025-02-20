import React, { useState, useEffect } from "react";
import { useIncentiveStore } from "../../../store/incentiveStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AvailableSalesCommission = () => {
  const {
    assignedCommissions = [],
    allSalesCommission = [],
    fetchAllSalesCommission,
    fetchMyAssignedSalesCommissions,
    assignedSalesCommission,
    isLoading,
  } = useIncentiveStore();

  useEffect(() => {
    fetchAllSalesCommission();
    fetchMyAssignedSalesCommissions();
    console.log("Fetched Assigned and Not Assigned Sales Commissions");
  }, [fetchAllSalesCommission, fetchMyAssignedSalesCommissions]);

  const handleAssign = async (commissionId, commissionStatus) => {
    if (commissionStatus === "Not Available") {
      toast.info("This sales commission is not available for assignment.");
      return;
    }

    try {
      const response = await assignedSalesCommission({ salesCommissionId: commissionId });

      if (response) {
        toast.success("Sales commission assigned successfully!");

        useIncentiveStore.setState((state) => ({
          allSalesCommission: state.allSalesCommission.filter(
            (commission) => commission._id !== commissionId
          ),
        }));

        await fetchMyAssignedSalesCommissions();
      }
    } catch (error) {
      toast.error("Failed to assign sales commission.");
      console.error("Assignment error:", error);
    }
  };

  const isCommissionAssigned = (commissionId) => {
    return assignedCommissions.some(
      (commission) => commission._id === commissionId
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
      <ToastContainer />
      <h2 className="text-3xl mb-5 text-center">Sales Commissions</h2>

      <div>
        <h3 className="text-xl font-semibold mb-3">Available Sales Commissions</h3>
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-center p-4">Loading...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Sales Commission Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Target Amount (₱)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Commission Rate (%)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {allSalesCommission.length > 0 ? (
                  allSalesCommission.map((commission) => (
                    <tr key={commission._id} className="hover:bg-gray-300 hover:text-white">
                      <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{commission.salesCommissionName}</td>
                      <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{commission.targetAmount?.toFixed(2) || "0.00"}</td>
                      <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{commission.commissionRate?.toFixed(2) || "0.00"}</td>
                      <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">
                        {commission.createdAt ? new Date(commission.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">
                        <button
                          onClick={() => handleAssign(commission._id, commission.status)}
                          className="btn btn-sm btn-success"
                          disabled={isCommissionAssigned(commission._id) || commission.status === "Not Available"}
                        >
                          {isCommissionAssigned(commission._id) ? "Assigned" : commission.status === "Not Available" ? "Not Available" : "Assign"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">No available sales commissions.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};

export default AvailableSalesCommission;
