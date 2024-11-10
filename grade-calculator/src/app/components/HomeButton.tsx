import style from "./HomeButton.module.css";

const HomeButton = (props) => {
  return (
    <button className={style.login} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default HomeButton;
