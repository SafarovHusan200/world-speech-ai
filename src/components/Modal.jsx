// import { Modal } from "antd";
// import React from "react";
// import "../styles/modal.css";

// const MyModal = ({
//   isModalVisible,
//   setIsModalVisible,
//   title,
//   problem,
//   solution,
//   image,
//   results,
// }) => {
//   const handleOk = () => {
//     console.log("OK button clicked");
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     console.log("Cancel button clicked");
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//         <h2 className="section-title">{title}</h2>

//         <div className="modal__block__component">
//           <div className="top">
//             <div className="icon">
//               <img src="/!.svg" alt="icon" />
//             </div>
//             <h4>Проблема</h4>
//           </div>
//           <p>{problem}</p>
//         </div>

//         <div className="modal__block__component">
//           <div className="top">
//             <div className="icon">
//               <img src="/check__icon.svg" alt="icon" />
//             </div>
//             <h4>Решение с Wordspeech</h4>
//           </div>
//           <p>{solution}</p>
//         </div>

//         <div className="cards">
//           {results.map((item) => (
//             <div className="card" key={item.id}>
//               <h5 className="card--title">{item?.title}</h5>
//               <p className="card--descr">{item?.description}</p>
//             </div>
//           ))}
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default MyModal;

import { Modal } from "antd";
import React from "react";
import "../styles/modal.css";

const MyModal = ({
  isModalVisible,
  setIsModalVisible,
  title,
  problem,
  solution,
  image,
  results,
}) => {
  const handleOk = () => {
    console.log("OK button clicked");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h2 className="section-title">{title}</h2>

        <div className="modal__block__component">
          <div className="top">
            <div className="icon">
              <img src="/!.svg" alt="icon" />
            </div>
            <h4>Проблема</h4>
          </div>
          <p>{problem}</p>
        </div>

        <div className="modal__block__component">
          <div className="top">
            <div className="icon">
              <img src="/check__icon.svg" alt="icon" />
            </div>
            <h4>Решение с Wordspeech</h4>
          </div>
          <p>{solution}</p>
        </div>

        <div className="cards">
          {results.map((item) => (
            <div className="card" key={item.id}>
              <h5 className="card--title">{item?.title}</h5>
              <p className="card--descr">{item?.description}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
