import style from "./LoginButton.module.css";

const Button = (props) => {
  return (
    <button className={style.login} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
