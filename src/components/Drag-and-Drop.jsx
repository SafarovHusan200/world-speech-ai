import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const { Dragger } = Upload;

const DraggerComponent = () => {
  const { data: session } = useSession();

  const uploadProps = {
    name: "file",
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "https://worldspeechai.com/api/v1/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        onSuccess(response.data);
        message.success(`${file.name} file uploaded successfully.`);
      } catch (error) {
        console.error("Upload error:", error);
        onError(error);
        message.error(`${file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...uploadProps}>
      {/* <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p> */}

      <img src="/upload.svg" alt="icon" />
      <label htmlFor="file" className="btn btn-primary">
        Загрузить файлы
      </label>
      <button type="button" id="file" className="none" />
      <p className="drag__and__drop">Или перетащите файлы сюда</p>
      <label htmlFor="spekers" className="spekers">
        <input type="checkbox" name="spekers" id="spekers" />
        Разделение на спикеров
      </label>
      <p className="file__type">Аудиоформаты: MP3, M4A, OGG, WAV, WMA, M4A</p>
    </Dragger>
  );
};

export default DraggerComponent;
