type ButtonProps={
    title:string;
      onClick?: () => void;
}
const Button = ({title,onClick}:ButtonProps) => {
  return (
    <button type='button' className={`flexCenter rounded-full border`}  onClick={onClick}>
        {title}
    </button>
  )
}

export default Button