import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

const PayrollProcessing = () => {
const {fetchUsers,users} = useAuthStore();

  useEffect(() => {
    document.title = 'Payroll Processing';
    const fetchUserData = async () => {
      try {
        await fetchUsers();
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error('Failed to load user data. Please try again.');
      }
    };
    
    fetchUserData();
  }, [fetchUsers]);

  const attendanceData = [
    {
      employeeName: 'Borlagdatan John Lloyd',
      totalRegularHours: 176,
      totalAbsent: 2,
      totalPresent: 18,
      totalOvertime: 15,
      totalHoliday: 1,
      totalHours: 176 - (2 * 8) + 15,
      monthlySalary: 25000,
      totalSalary: (25000 / 176) * (176 - (2 * 8) + 15),
      attendancePercentage: ((18 / 22) * 100).toFixed(2) + '%',
    },
    {
      employeeName: 'Canja Abeguel',
      totalRegularHours: 176,
      totalAbsent: 0,
      totalPresent: 20,
      totalOvertime: 12,
      totalHoliday: 2,
      totalHours: 176 - (0 * 8) + 12,
      monthlySalary: 25000,
      totalSalary: (25000 / 176) * (176 - (0 * 8) + 12),
      attendancePercentage: ((20 / 22) * 100).toFixed(2) + '%',
    },
  ];
  


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Payroll Processing</h1>
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Employee Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Total Hours</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Total Present</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Total Absent</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Total Overtime</th>
            <th className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">Total Holiday</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-300 hover:text-white">
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.employeeName}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.totalHours}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.totalPresent}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.totalAbsent}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.totalOvertime}</td>
              <td className="px-6 py-4 text-left text-xs font-semibold  text-neutral uppercase tracking-wider">{employee.totalHoliday}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Salary Computation</h2>
            <p>Compute employee salaries based on attendance and performance.</p>
            <Link to="/salary-computation" className="btn btn-primary"><button>Salary Computation</button></Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Request Budget</h2>
            <p>Request additional budget for payroll management.</p>
            <Link to="/request-budget" className="btn btn-primary"><button>Request Budget</button></Link>
          </div>
        </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Payroll Distribution</h2>
              <p>
                Efficiently manage and distribute payroll to employees through various payment methods.
              </p>
              <Link to="/payroll-distribution" className="btn btn-primary"><button>Payroll Distribution</button></Link>
            </div>
          </div>

                <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Payroll Reports</h2>
            <p>Generate detailed payroll reports for auditing and record-keeping.</p>
            <Link to="/generate-reports" className="btn btn-primary"><button>Reports</button></Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Payroll History</h2>
            <p>View historical payroll data for all employees.</p>
            <Link to="/payroll-history" className="btn btn-primary"><button>History</button></Link>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PayrollProcessing;
