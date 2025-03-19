import React from 'react'

interface ModalProps {
    content: string;
    onClickedCancel: () => void;
    onClickedOk: () => void;
}

const Modal: React.FC<ModalProps> = ({content, onClickedCancel, onClickedOk}) => {
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 border-2 backdrop-blur-md" onClick={onClickedCancel}>
        <div className="bg-white p-6 rounded-lg w-[250px] shadow-lg" onClick={(e) => {e.stopPropagation()}}>
          <h3 className="text-lg font-semibold mb-6">{content}</h3>
          
          <div className="flex justify-between items-center mt-6">
            <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition active:scale-95"
              onClick={() => onClickedCancel()}>취소
            </button>
            <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 active:scale-95"
              onClick={() => onClickedOk()}>확인
            </button>
          </div>
        </div>
      </div>
    );
};

export default Modal