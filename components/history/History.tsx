"use client";

import useHistory from "@/customHooks/history/useHistory";

const History = () => {
  const { history, loading, error } = useHistory();

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  if (history.length === 0)
    return <h2>No Appointment History</h2>;

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Appointment History
      </h1>

      <div className="space-y-5">

        {history.map((item: any) => (
          <div
            key={item._id}
            className="border rounded-xl p-5 shadow"
          >
            <h2 className="text-xl font-bold">
              {item.doctor?.name}
            </h2>

            <p>
              <b>Date:</b> {item.date}
            </p>

            <p>
              <b>Time:</b> {item.time}
            </p>

            <p>
              <b>Fees:</b> ₹{item.doctor?.fees}
            </p>

            <p>
              <b>Status:</b> {item.status}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default History;