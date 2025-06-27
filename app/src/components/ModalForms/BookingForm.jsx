import { toast } from "react-toastify";

const BookingForm = ({ isOpen, setIsOpen, form, setForm, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    toast.success("Booking saved successfully!");
    setIsOpen(false);
  };

  return (
    <dialog
      style={{
        display: isOpen ? "flex" : "none",
        position: "fixed",
        inset: "0",
        zIndex: "50",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      className="modal modal-open"
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Booking Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="label font-semibold">Tour ID</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Tour ID"
            value={form.tour_id}
            onChange={(e) => setForm({ ...form, tour_id: e.target.value })}
            required
          />

          <label className="label font-semibold">User ID</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter User ID"
            value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
            required
          />

          <label className="label font-semibold">Booking Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={form.reservation_date}
            onChange={(e) => setForm({ ...form, reservation_date: e.target.value })}
            required
          />

          <label className="label font-semibold">Number of People</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={form.nbr_personnes}
            onChange={(e) =>
              setForm({ ...form, nbr_personnes: e.target.value })
            }
            required
          />

          <label className="label font-semibold">Total Price</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className="input input-bordered w-full"
            value={form.total_price}
            onChange={(e) =>
              setForm({ ...form, total_price: e.target.value })
            }
            required
          />

          <label className="label font-semibold">Status</label>
          <select
            className="select select-bordered w-full"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="d-flex justify-content-center gap-4 mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Save
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BookingForm;
