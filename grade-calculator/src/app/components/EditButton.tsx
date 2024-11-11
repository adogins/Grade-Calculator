import style from "./EditButton.module.css";

const Button = (props) => {
  return (
    <button className={style.edit} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
