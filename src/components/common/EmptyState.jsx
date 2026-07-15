import { MdCloudOff } from "react-icons/md";
import GlassCard from "./GlassCard";

function EmptyState({
  title,
  description
}) {
  return (
    <GlassCard className="p-8">
      <div
        className="
          flex
          flex-col
          items-center
          text-center
          gap-4
        "
      >
        <MdCloudOff
          size={52}
          className="
            text-white/50
          "
        />

        <h3
          className="
            text-white
            font-semibold
            text-lg
          "
        >
          {title}
        </h3>

        <p
          className="
            text-white/65
            text-sm
            max-w-sm
          "
        >
          {description}
        </p>
      </div>
    </GlassCard>
  );
}

export default EmptyState;