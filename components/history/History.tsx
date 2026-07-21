"use client";

import useHistory from "@/customHooks/history/useHistory";
import { Calendar, Clock, IndianRupee, User, Stethoscope, AlertCircle, CheckCircle, XCircle, Clock as ClockIcon, ArrowLeft, LayoutDashboard } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

// Type definitions based on your API response
interface Doctor {
  _id: string;
  name: string;
  departmentId: string;
  fees: string;
}

interface Appointment {
  _id: string;
  doctorId: Doctor;
  userId: string;
  name: string;
  date: string;
  time: string;
  status: "Confirmed" | "Cancelled" | "Pending" | "Completed";
  createdAt: string;
  __v: number;
}

interface HistoryResponse {
  status: boolean;
  totalAppointments: number;
  data: Appointment[];
  message: string;
}

const History = () => {
  const { history, loading, error } = useHistory();
  const router = useRouter();

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch {
      return dateString.split("T")[0];
    }
  };

  // Get status color and icon
  const getStatusConfig = (status: string) => {
    const statusMap: Record<string, { color: string; bgColor: string; icon: React.ReactNode }> = {
      Confirmed: {
        color: "text-green-700",
        bgColor: "bg-green-50",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      Cancelled: {
        color: "text-red-700",
        bgColor: "bg-red-50",
        icon: <XCircle className="w-4 h-4" />,
      },
      Pending: {
        color: "text-yellow-700",
        bgColor: "bg-yellow-50",
        icon: <ClockIcon className="w-4 h-4" />,
      },
      Completed: {
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        icon: <CheckCircle className="w-4 h-4" />,
      },
    };
    return statusMap[status] || statusMap.Pending;
  };

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="border rounded-xl p-5 shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-8 bg-gray-200 rounded-full w-24"></div>
      </div>
    </div>
  );

  // Loading state with multiple skeletons
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Back button skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg w-40 mb-6 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!history?.length) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Appointment History</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Appointments Yet</h2>
          <p className="text-gray-500">Your appointment history will appear here once you book your first appointment.</p>
          <button 
            onClick={() => router.push("/book-appointment")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    );
  }

  // Main render with data
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Back to Dashboard Button */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header with total count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Appointment History</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full mt-2 sm:mt-0">
          {history.length} {history.length === 1 ? "Appointment" : "Appointments"}
        </span>
      </div>

      {/* Appointment cards */}
      <div className="space-y-4">
        {history.map((item: Appointment) => {
          const statusConfig = getStatusConfig(item.status);
          const formattedDate = formatDate(item.date);

          return (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left section - Doctor info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                        {item.doctorId?.name || "Doctor Name"}
                      </h2>
                    </div>
                    <span
                      className={`${statusConfig.bgColor} ${statusConfig.color} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 whitespace-nowrap ml-2`}
                    >
                      {statusConfig.icon}
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Patient: <span className="font-medium text-gray-700">{item.name}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Date: <span className="font-medium text-gray-700">{formattedDate}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>Time: <span className="font-medium text-gray-700">{item.time}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gray-400" />
                      <span>Fees: <span className="font-medium text-gray-700">₹{item.doctorId?.fees || "N/A"}</span></span>
                    </div>
                  </div>
                </div>

                {/* Action button (optional) */}
                {item.status === "Confirmed" && (
                  <button 
                    onClick={() => router.push(`/appointments/${item._id}`)}
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
                  >
                    View Details
                  </button>
                )}
              </div>

              {/* Booking date */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Booked on {format(new Date(item.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;