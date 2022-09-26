import React from "react";
import { generateRandom } from "../../utils/randomId";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSurvey, updateSurvey } from "../../Store/Slices/MainSlice";
import { removeModal } from "../../Store/Slices/ModalSlice";
import "./styles.css";
import { useEffect } from "react";
import { validateDate, validateField } from "../../utils/validation";

const Index = ({ editSurvey, type }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("initial");
  const [surveyData, setSurveyData] = useState({
    id: generateRandom(),
    type,
    title: "",
    desc: "",
    startDate: "",
    endDate: "",
    picture: "",
    questions: [],
  });

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setError("");
    // Handle picture input file
    if (id === "picture") {
      const [file] = e.target.files;
      if (file) {
        setSurveyData((prevState) => ({
          ...prevState,
          [id]: URL.createObjectURL(file),
        }));
      }
    } else setSurveyData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = () => {
    const validateForm = (data) => {
      const titleError = validateField(data.title);
      const dateError = validateDate(data.startDate, data.endDate);

      if (titleError !== true) {
        return { error: titleError, field: "title" };
      }
      if (dateError !== true) {
        return dateError;
      }

      return true;
      // if (data.title.trim().length === 0) {
      //   return "title";
      // } else if (data.startDate.trim().length === 0) {
      //   return "startDate";
      // } else if (data.endDate.trim().length === 0) {
      //   return "endDate";
      // }
      // else if (data.type.trim().length === 0) {
      //   return "type";
      // }
    };
    const tempErr = validateForm(surveyData);

    setError(tempErr);
    if (tempErr !== true) return;

    if (editSurvey) {
      dispatch(updateSurvey(surveyData));
    } else {
      dispatch(addSurvey(surveyData));
    }
    dispatch(removeModal());
  };
  useEffect(() => {
    editSurvey && setSurveyData((prevState) => ({ ...editSurvey }));
  }, [editSurvey]);

  return (
    <>
      <div className="box">
        <label
          htmlFor="title"
          style={{ color: error.field === "title" && "red" }}
        >
          {`عنوان ${type === "exam" ? "آزمون" : "پرسشنامه"} را وارد کنید`}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={surveyData.title}
          onChange={handleChangeInput}
          style={{ border: error.field === "title" && "1px solid red" }}
        />
        {error.field === "title" && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {error.error === "small"
              ? "حداقل 3 کاراکتر وارد نمایید"
              : "عنوان نمیتواند با علایم نگارشی شروع شود"}
          </p>
        )}
      </div>
      <div className="box">
        <label htmlFor="desc">توضیحات :</label>
        <input
          type="text"
          id="desc"
          name="desc"
          value={surveyData.desc}
          onChange={handleChangeInput}
        />
      </div>
      <div className="box">
        <label htmlFor="startDate">*تاریخ شروع :</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={surveyData.startDate}
          onChange={handleChangeInput}
          style={{ border: error.type === "startDate" && "1px solid red" }}
        />
        {error.type === "startDate" && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {error.error === "small" ? "تاریخ شروع را وارد نمایید" : ""}
          </p>
        )}
      </div>
      <div className="box">
        <label
          htmlFor="endDate"
          style={{ color: error === "invalid" && "red" }}
        >
          تاریخ پایان :
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={surveyData.endDate}
          onChange={handleChangeInput}
          style={{ border: error === "invalid" && "1px solid red" }}
        />
        {error === "invalid" && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {error === "invalid"
              ? "تاریخ پایان نمیتواند قبل از تاریخ شروع باشد"
              : ""}
          </p>
        )}
      </div>
      <div className="box">
        <label htmlFor="pictures">تصویر</label>
        <input
          type="file"
          accept="image/*"
          id="picture"
          name="picture"
          onChange={handleChangeInput}
          className="file__input"
        />
        {surveyData.picture && (
          <img width="48px" height="48px" src={surveyData.picture} alt="pic" />
        )}
      </div>
      <button className="create__button" onClick={handleSubmit}>
        {editSurvey ? "ذخیره" : "ایجاد پرسشنامه"}
      </button>
    </>
  );
};

export default Index;
