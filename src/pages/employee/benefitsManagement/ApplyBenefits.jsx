import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBenefitStore } from "../../../store/benefitStore";
import { io } from 'socket.io-client';
const ApplyBenefits = () => {
  const {
    requestBenefit,
    fetchBenefit,
    benefit: benefits = [],
    fetchMyRequestBenefits,
    myRequestBenefits = [],
  } = useBenefitStore();

  const socketURL = import.meta.env.MODE === "development" 
  ? "http://localhost:7687" 
  : window.location.origin;

const socket = io(socketURL, { withCredentials: true });


  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const [formData, setFormData] = useState({
    benefitType: "",
    frontIdFile: null,
    backIdFile: null,
  });

  useEffect(() => {
    fetchBenefit();
    fetchMyRequestBenefits();

    socket.on('existingBenefitRequests', (requests) => {
      setSalaryRequests(requests);
    });

    socket.on('newBenefitRequest', (newRequest) => {
      addSalaryRequest(newRequest);
    });

    return () => {
      socket.disconnect();
    };

  }, []);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG and PNG are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit.");
      return;
    }

    setFormData({ ...formData, [fieldName]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const existingRequest = myRequestBenefits.find(
      (benefit) => benefit.benefitsName.benefitsName === formData.benefitType
    );
  
    if (existingRequest) {
      if (existingRequest.status === "Pending") {
        toast.warning("You have already requested this benefit. Please wait for confirmation.");
        setLoading(false);
        return;
      } else if (existingRequest.status === "Approved") {
        toast.error("You have already been approved for this benefit.");
        setLoading(false);
        return;
      }
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("benefitsName", formData.benefitType);
    formDataToSend.append("frontId", formData.frontIdFile);
    formDataToSend.append("backId", formData.backIdFile);
  
    try {
      console.log("Submitting request...");
      const success = await requestBenefit(formDataToSend);
      console.log("Request response:", success);
  
      if (success) {
        toast.success("Benefit request submitted successfully!");
        setFormData({ benefitType: "", frontIdFile: null, backIdFile: null });
        setFormKey((prevKey) => prevKey + 1);
        fetchMyRequestBenefits();
      } else {
        toast.error("Failed to submit benefit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Error submitting request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-4">Apply for Benefits</h1>

      <form onSubmit={handleSubmit} key={formKey}>
        <div className="mb-4">
          <label className="block font-semibold">Select Benefit</label>
          <select
            name="benefitType"
            value={formData.benefitType}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Choose a benefit</option>
            {benefits?.map((benefit) => (
              <option key={benefit._id} value={benefit.benefitsName}>
                {benefit.benefitsName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Upload Front ID (JPG/PNG, Max: 2MB)</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "frontIdFile")}
            className="file-input file-input-bordered w-full"
            accept="image/jpeg, image/png"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Upload Back ID (JPG/PNG, Max: 2MB)</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "backIdFile")}
            className="file-input file-input-bordered w-full"
            accept="image/jpeg, image/png"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4">Your Benefit Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Benefit Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Date Requested</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(myRequestBenefits) && myRequestBenefits.length > 0 ? (
              myRequestBenefits.map((benefit, index) => (
                <tr key={benefit._id} className="text-center">
                  <td className="px-6 py-4 text-left text-xs font-semibold text-neutral uppercase tracking-wider">{index + 1}</td>
                  <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">
                    {benefit.benefitsName.benefitsName || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">
                    <span
                      className={`badge ${
                        benefit.status === "Approved"
                          ? "badge-success"
                          : benefit.status === "Pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {benefit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">
                    {new Date(benefit.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No benefit requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplyBenefits;
