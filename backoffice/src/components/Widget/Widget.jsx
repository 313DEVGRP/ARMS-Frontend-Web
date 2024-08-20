function Widget({ children, className }) {
  return <section className={`widget ${className || ''}`}>{children}</section>;
}

export default Widget;
