import style from "./SignupForm.module.css";

const SubmitButton = (props) => {
  return (
    <button
      className={style.submit}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
