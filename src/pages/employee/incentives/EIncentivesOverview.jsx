import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIncentiveStore } from '../../../store/incentiveStore';

const EIncentivesOverview = () => {
    const { fetchIncentive, incentive: incentives } = useIncentiveStore();

    useEffect(() => {
        document.title = "Incentives Overview";
        fetchIncentive();
    }, [fetchIncentive]);

    return (
        <div className="relative max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Incentive Overview</h2>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className='overflow-x-auto'>
                    <tr>
                        <th className='px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider'>Incentives Name</th>
                        <th className='px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider'>Description</th>
                        <th className='px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider'>Incentives Type</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(incentives) && incentives.length > 0 ? (
                        incentives.map((incentive) => (
                            <tr key={`${incentive._id}-${incentive.incentivesName}`}className="hover:bg-gray-300 hover:text-white">
                                <td className='px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider'>{incentive.incentivesName || 'N/A'}</td>
                                <td className='px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider'>{incentive.incentivesDescription || 'N/A'}</td>
                                <td className='px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider'>{incentive.incentivesType || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No incentive found!</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Incentives Management</h1>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Incentive Requests</h2>
                            <p>Review employee incentive requests.</p>
                            <Link to="/incentive-request" className="btn btn-primary">
                                <button>View Requests</button>
                            </Link>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                <h2 className="card-title">Assigned Commissions</h2>
                <p>View and track your assigned sales commissions.</p>
                <Link to="/my-assigned-commissions" className="btn btn-primary">
                    <button>View Assigned Commissions</button>
                </Link>
                  </div>
                  </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Sales Commissions</h2>
                            <p>Manage sales commissions for employees.</p>
                            <Link to="/my-commissions" className="btn btn-primary">
                                <button>View Commissions</button>
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Employee Recognitions</h2>
                        <p>See employees recognized for their achievements.</p>
                        <Link to="/recognition-lists" className="btn btn-primary">
                            View Recognitions
                        </Link>
                    </div>
                </div>



                {/*     <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Incentive History</h2>
                            <p>View historical data on incentives.</p>
                            <Link to="/incentive-history" className="btn btn-primary">
                                <button>View History</button>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default EIncentivesOverview;
