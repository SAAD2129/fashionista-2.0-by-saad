function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`flex flex-col bg-white  ${extra} dark:!bg-navy-800 dark:text-white dark:shadow-none `}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
