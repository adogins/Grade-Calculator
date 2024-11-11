import style from "./ExitNewCourseButton.module.css";

const ExitNewCourseButton = (props) => {
    return (
      <button className={style.newCourse} type={props.type} onClick={props.onClick}>
        {props.children}
      </button>
    );
};
  
export default ExitNewCourseButton;