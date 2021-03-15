import React, { useState } from "react";
import { Modal } from "../../Context/Modal";
import PostForm from "./PostForm";
function PostModal({ edit }) {
const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i
        className="far fa-plus-square navbar__icon"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm setShowModal={setShowModal} edit={edit} />
        </Modal>
      )}
    </>
  );
}

export default PostModal;
