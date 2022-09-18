import React from "react";
import { generateRandom } from "../../utils/randomId";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSurvey } from "../../Store/Slices/MainSlice";
import { removeModal } from "../../Store/Slices/ModalSlice";
import "./styles.css";
import { useEffect } from "react";

const Index = ({ editSurvey }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("initial");
  const [surveyData, setSurveyData] = useState({
    id: generateRandom(),
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

  const handleCreateSurvey = () => {
    const validateForm = (data) => {
      if (data.title.trim().length === 0) {
        return "title";
      } else if (data.startDate.trim().length === 0) {
        return "startDate";
      } else if (data.endDate.trim().length === 0) {
        return "endDate";
      }
      return "";
    };
    const tempErr = validateForm(surveyData);
    setError(tempErr);
    if (tempErr) return;
    dispatch(addSurvey(surveyData));
    dispatch(removeModal());
  };
  useEffect(() => {
    editSurvey && setSurveyData((prevState) => ({ ...editSurvey }));
  }, [editSurvey]);
  return (
    <>
      <div className="box">
        <label htmlFor="title" style={{ color: error === "title" && "red" }}>
          *عنوان پرسشنامه را وارد کنید :{" "}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={surveyData.title}
          onChange={handleChangeInput}
        />
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
        <label
          htmlFor="startDate"
          style={{ color: error === "startDate" && "red" }}
        >
          *تاریخ شروع :
        </label>
        <input
          type="text"
          id="startDate"
          name="startDate"
          value={surveyData.startDate}
          onChange={handleChangeInput}
        />
      </div>
      <div className="box">
        <label
          htmlFor="endDate"
          style={{ color: error === "endDate" && "red" }}
        >
          *تاریخ پایان :
        </label>
        <input
          type="text"
          id="endDate"
          name="endDate"
          value={surveyData.endDate}
          onChange={handleChangeInput}
        />
      </div>
      <div className="box">
        <label htmlFor="pictures">تصویر</label>
        <input
          type="file"
          accept="image/*"
          id="picture"
          name="picture"
          onChange={handleChangeInput}
        />
        {surveyData.picture && (
          <img width="48px" height="48px" src={surveyData.picture} alt="pic" />
        )}
      </div>
      <button className="create__button" onClick={handleCreateSurvey}>
        {editSurvey ? "ذخیره" : "ایجاد پرسشنامه"}
      </button>
    </>
  );
};

export default Index;
