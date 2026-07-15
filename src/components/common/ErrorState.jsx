import { MdErrorOutline } from "react-icons/md";
import GlassCard from "./GlassCard";

function ErrorState({
  message,
  onRetry
}) {
  return (
    <GlassCard className="p-6">
      <div
        className="
          flex
          flex-col
          items-center
          text-center
          gap-4
        "
      >
        <MdErrorOutline
          className="
            text-red-400
          "
          size={48}
        />

        <h3
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          Something went wrong
        </h3>

        <p
          className="
            text-white/70
            text-sm
          "
        >
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="
              px-5
              py-2.5
              rounded-full
              bg-white/15
              hover:bg-white/20
              text-white
              transition
            "
          >
            Try Again
          </button>
        )}
      </div>
    </GlassCard>
  );
}

export default ErrorState;