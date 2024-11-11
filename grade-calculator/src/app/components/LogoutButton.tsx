import style from "./LogoutButton.module.css";

const Button = (props) => {
  return (
    <button className={style.logout} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
