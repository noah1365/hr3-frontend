import { useIncentiveStore } from "../../../store/incentiveStore";
import React, { useEffect } from "react";

const RecognitionLists = () => {
  const { allRecognitionPrograms, fetchAllRecognitionPrograms } = useIncentiveStore();

  useEffect(() => {
    document.title = "Recognition Programs";
    fetchAllRecognitionPrograms();
  }, [fetchAllRecognitionPrograms]);

  return (
    <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
      <h1 className="text-3xl text-center font-semibold mb-6">Recognition Programs Lists</h1>

      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="bg-primary text-white">
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Award Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Reward Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Reward Value</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allRecognitionPrograms) && allRecognitionPrograms.length > 0 ? (
              allRecognitionPrograms.map((program, index) => (
                <tr key={index} className="hover:bg-neutral hover:text-white">
                 <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">
                    {program?.employeeId?.firstName ?? "Unknown"} {program?.employeeId?.lastName ?? ""}
                  </td>
                 <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{program?.awardName ?? "N/A"}</td>
                 <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{program?.description ?? "N/A"}</td>
                 <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{program?.rewardType ?? "N/A"}</td>
                 <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{program?.rewardValue ?? "0"}</td>
                 <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{program?.status ?? "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No recognition programs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecognitionLists;
