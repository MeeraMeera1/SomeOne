import React, { useState } from "react";
import { RiEditLine } from "react-icons";
import { ShowModal, HideModal } from "../../store/modal";
import PostForm from "./PostForm";
import { useDispatch, useSelector } from "react-redux";

function PostModal({ edit }) {
    const dispatch = useDispatch();
    const modalDisplay = useSelector((state) => state.modal.display);

  return (
    <>
      <RiEditLine onClick={() => dispatch(ShowModal)}/>
      {modalDisplay ? (
          <div className="modal-background" onClick={() => dispatch(HideModal())}>
            <PostForm setShowModal={setShowModal} edit={edit} />
          </div>
      ) : null}
    </>
  );
}

export default PostModal;
