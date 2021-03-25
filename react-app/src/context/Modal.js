import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import ReactDOM from "react-dom";


const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 right-0 left-0 bottom-0 z-10 flex justify-center items-center">
      <div
        className="fixed top-0 right-0 left-0 bottom-0 bg-dblueblack"
        onClick={onClose}
      />
      <div className="text-white absolute w-auto my-auto">{children}</div>
    </div>,
    modalNode
  );
}
