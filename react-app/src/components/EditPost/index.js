import React, { useState } from "react";
import { Modal } from "../../Context/Modal";
import PostForm from "../PostModal/PostForm";

function EditPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i
        className="fas fa-ellipsis-h navbar__icon"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm post={post} edit={true} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
