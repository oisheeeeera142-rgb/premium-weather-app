import GlassCard from "../common/GlassCard";

function SettingCard({
  icon,
  title,
  description,
  rightContent,
  onClick
}) {
  return (
    <GlassCard
      hover={false}
      className="
        p-5
        cursor-pointer
      "
    >
      <button
        onClick={onClick}
        className="
          w-full
          flex
          items-center
          justify-between
          gap-4
          text-left
        "
      >
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              text-2xl
              text-white
            "
          >
            {icon}
          </div>

          <div>
            <h3
              className="
                text-white
                font-semibold
              "
            >
              {title}
            </h3>

            {description && (
              <p
                className="
                  text-white/60
                  text-sm
                "
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {rightContent}
      </button>
    </GlassCard>
  );
}

export default SettingCard;