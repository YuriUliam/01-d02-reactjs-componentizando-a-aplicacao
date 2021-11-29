interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <span className="category">Categoria:<span> {props.title}</span></span>
    </header>
  )
}