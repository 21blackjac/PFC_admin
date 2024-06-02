import { useState, useEffect } from "react";
import Modal from "react-modal";
import PaymentForm from "./ModalForms/PaymentForm";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "./components_css/PaymentListCss.css";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:8050/Payment/Payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleAddPayment = async (payment) => {
    try {
      const response = await axios.post("http://localhost:8050/Payment/addPayment", payment);
      setPayments([...payments, { ...payment, id: response.data.id }]);
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  const handleUpdatePayment = async (payment) => {
    try {
      const response = await axios.put(`http://localhost:8050/Payment/updatePayment/${payment._id}`, payment);
      if (response.status === 200) {
        setPayments(payments.map((u) => (u._id === payment._id ? payment : u)));
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      const response = await axios.delete(`http://localhost:8050/Payment/deletePayment/${paymentId}`);
      if (response.status === 200) {
        setPayments(payments.filter((payment) => payment._id !== paymentId));
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const handleOpenModal = (payment = null) => {
    setCurrentPayment(payment);
    setIsEdit(!!payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPayment(null);
    setIsEdit(false);
  };

  const handleFormSubmit = (payment) => {
    if (isEdit) {
      handleUpdatePayment(payment);
    } else {
      handleAddPayment(payment);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto mt-5">
      <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
        <h1>Pricing Plan</h1>
      </div>
      <div className="cards-container">
        {payments.map((payment) => (
          <div key={payment._id} className="cards__inner">
            <div className="cards__card card">
              <p className="card__heading">{payment.duration}</p>
              <p className="card__price">{payment.price}DH/month</p>
              <ul className="card_bullets flow" role="list">
                {payment.description.split(', ').map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <div className="card__actions">
                <div className="updateButton">
                <FaEdit onClick={() => handleOpenModal(payment)} />
                </div>
                  <FaTrash onClick={() => handleDeletePayment(payment._id)} />
              </div>
            </div>
            <div className="overlay cards__inner"></div>
          </div>
        ))}
      </div>
      <button className="add-payment-button" onClick={() => handleOpenModal()}>
        <FaPlus /> Add Payment
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Payment Modal">
        <PaymentForm
          payment={currentPayment}
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default PaymentList;
