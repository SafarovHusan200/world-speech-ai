// "use client";

// import { message, Upload } from "antd";
// import React from "react";

// import useHttp from "@/app/hooks/useHttp";
// import { baseAPI } from "@/constants/domain";
// import { URLS } from "@/constants/url";

// const { Dragger } = Upload;

// const DraggerComponent = () => {
//   const { request, loading, error } = useHttp();

//   const url = baseAPI + URLS.file_upload;
//   const uploadProps = {
//     name: "file",
//     multiple: true,
//     customRequest: async ({ file, onSuccess, onError }) => {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await request(url, "POST", formData, {
//           "Content-Type": "multipart/form-data",
//         });

//         onSuccess(response);
//         message.success(`${file.name} file uploaded successfully.`);
//       } catch (error) {
//         message.error(error || "An error occurred");
//         onError(error);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   return (
//     <Dragger {...uploadProps}>
//       <img src="/upload.svg" alt="icon" />
//       <button className="btn btn-primary">Загрузить файлы</button>
//       <button type="button" id="files" className="none" />
//       <p className="drag__and__drop">Или перетащите файлы сюда</p>
//       <label htmlFor="spekers" className="spekers">
//         <input type="checkbox" name="spekers" id="spekers" />
//         Разделение на спикеров
//       </label>
//       <p className="file__type">Аудиоформаты: MP3, M4A, OGG, WAV, WMA, M4A</p>
//     </Dragger>
//   );
// };

// export default DraggerComponent;
"use client";

import { message, Upload } from "antd";
import React, { useState } from "react";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";

const { Dragger } = Upload;

const DraggerComponent = () => {
  const { request } = useHttp();
  const [isSpeakersChecked, setIsSpeakersChecked] = useState(false); // Checkbox holatini boshqarish

  const getMeData = async () => {
    const url = `${baseAPI + URLS.profile}`;
    const res = await request(url, "GET")
      .then((response) => {
        setUser(response);

        return response;
      })
      .catch((err) => {
        return err;
      });
  };
  const url = baseAPI + URLS.file_upload;
  const uploadProps = {
    name: "file",
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("diarization", isSpeakersChecked);

        const response = await request(url, "POST", formData, {
          "Content-Type": "multipart/form-data",
        });

        onSuccess(response);
        getMeData();
        message.success(`${file.name} file uploaded successfully.`);
      } catch (error) {
        message.error(error || "An error occurred");
        onError(error);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleCheckboxChange = (e) => {
    setIsSpeakersChecked(e.target.checked);
  };

  return (
    <div className="upload-section">
      <Dragger {...uploadProps}>
        <img src="/upload.svg" alt="icon" />
        <label htmlFor="" className="btn btn-primary">
          Загрузить файлы
        </label>
        <button type="button" id="files" className="none" />
        <p className="drag__and__drop">Или перетащите файлы сюда</p>

        <p className="file__type">Аудиоформаты: MP3, MP4, OGG, WAV, WMA, M4A</p>
      </Dragger>

      <label htmlFor="spekers" className="spekers">
        <input
          type="checkbox"
          name="spekers"
          id="spekers"
          onChange={handleCheckboxChange}
        />
        Разделение на спикеров
      </label>
    </div>
  );
};

export default DraggerComponent;
