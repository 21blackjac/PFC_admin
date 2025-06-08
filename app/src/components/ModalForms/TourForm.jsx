// TourForm.jsx
import React from "react";
import { toast } from "react-toastify";

const TourForm = ({
  isOpen,
  setIsOpen,
  form,
  setForm,
  onSubmit,
  editingId,
}) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    toast.success(`Tour ${editingId ? "updated" : "created"} successfully!`);
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
          {editingId ? "Edit Tour" : "Add Tour"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="label font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Title"
            required
          />

          <label className="label font-semibold">Price</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Price"
            required
          />

          <label className="label font-semibold">Duration (Days)</label>
          <input
            type="text"
            name="duration_days"
            value={form.duration_days}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Duration"
            required
          />

          <label className="label font-semibold">Destination ID</label>
          <input
            type="text"
            name="destination_id"
            value={form.destination_id}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Destination ID"
            required
          />

          <label
            className="label font-semibold"
          >
            Image
          </label>
          <input
            type="file"
            aria-describedby="file_input_help"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                   bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
                   dark:placeholder-gray-400"
          />
          <p
            className="mt-1 text-sm text-gray dark:text-gray"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>

          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            required
          ></textarea>

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

export default TourForm;
