import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import LoginForm from "./LoginForm";

export default function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="text-white border-none bg-transparent rounded-lg hover:bg-white text-dblue" onClick={() => setShowModal(true)}>
        Log In
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}
