import style from "./SubmitNewCourseButton.module.css";

const SubmitNewCourseButton = (props) => {
    return (
      <button className={style.newCourse} type={props.type} onClick={props.onClick}>
        {props.children}
      </button>
    );
};
  
export default SubmitNewCourseButton;