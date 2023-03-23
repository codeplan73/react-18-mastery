interface Props {
    children: string;
    color?: 'primary' | 'secondary' | 'info' | 'danger' | 'warning';
    onClick: () => void;

}

const Button = ({children, onClick, color='primary'}: Props) => {
  return (
    <div className={'btn btn-' + color} onClick={onClick}>{children}</div>
  )
}

export default Button