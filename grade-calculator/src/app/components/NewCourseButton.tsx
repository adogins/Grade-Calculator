import style from "./NewCourseButton.module.css";

const NewCourseButton = (props) => {
    return (
      <button className={style.newCourse} type={props.type} onClick={props.onClick}>
        {props.children}
      </button>
    );
};
  
export default NewCourseButton;
