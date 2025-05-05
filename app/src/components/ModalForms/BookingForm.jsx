import React, { forwardRef, useState, useImperativeHandle } from 'react';

const BookingForm = forwardRef(({ onSubmit, form, setForm }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // submit logic passed from parent
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        method="dialog"
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <h3 className="text-lg font-bold mb-4">Booking Form</h3>

        {/* Add your form fields */}
        <input
          type="text"
          placeholder="Tour ID"
          className="input input-bordered w-full mb-3"
          value={form.tour_id}
          onChange={(e) => setForm({ ...form, tour_id: e.target.value })}
        />

        {/* Submit & Cancel buttons */}
        <div className="modal-action text-right">
          <button type="submit" className="btn btn-primary mr-2">Save</button>
          <button type="button" className="btn btn-error" onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </form>
    </dialog>
  );
});

export default BookingForm;
