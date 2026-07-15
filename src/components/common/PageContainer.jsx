function PageContainer({
  children,
  className = ""
}) {
  return (
    <div
      className={`
        w-full
        min-h-screen
        px-4
        md:px-6
        lg:px-8
        pb-32
        pt-6
        max-w-7xl
        mx-auto
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default PageContainer;