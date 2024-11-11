import style from "./DeleteButton.module.css";

const Button = (props) => {
  return (
    <button className={style.delete} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
