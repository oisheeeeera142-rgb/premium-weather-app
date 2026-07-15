function SettingsSection({
  title,
  children
}) {
  return (
    <section className="mb-8">
      <h2
        className="
          text-white
          text-lg
          font-bold
          mb-4
        "
      >
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}

export default SettingsSection;