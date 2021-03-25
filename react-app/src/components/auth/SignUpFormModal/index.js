import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "./SignUpForm";

export default function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="text-white border-none bg-transparent rounded-lg hover:bg-white text-dblue"
        onClick={() => setShowModal(true)}
      >
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}
