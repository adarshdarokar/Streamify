import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants"; // correct path

const FriendCard = ({ friend }) => {
  if (!friend) return null;

  // DEBUG LOG (correct)
  console.log("FRIEND DATA:", friend);

  return (
    <div className="card bg-base-200 hover:bg-base-300/40 rounded-xl border border-base-content/10 transition-all shadow-sm hover:shadow-md">
      <div className="card-body p-4">

        {/* TOP USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 rounded-full ring ring-primary/20 ring-offset-2">
            <img
              src={friend.profilePic || "/default-avatar.png"}
              alt={friend.fullName}
              className="rounded-full object-cover"
            />
          </div>

          <h3 className="font-semibold truncate text-base">
            {friend.fullName || "Unknown User"}
          </h3>
        </div>

        {/* LANGUAGES */}
        <div className="flex flex-wrap gap-2 mb-3">

          <span className="badge badge-secondary text-xs flex items-center gap-1 px-2 py-1">
            {getLanguageFlag(friend.nativeLanguage)}
            <span>Native: {friend.nativeLanguage || "N/A"}</span>
          </span>

          <span className="badge badge-outline text-xs flex items-center gap-1 px-2 py-1">
            {getLanguageFlag(friend.learningLanguage)}
            <span>Learning: {friend.learningLanguage || "N/A"}</span>
          </span>

        </div>

        {/* MESSAGE BUTTON */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline btn-sm w-full rounded-full"
        >
          Message
        </Link>

      </div>
    </div>
  );
};

export default FriendCard;


/* FLAG FUNCTION */
export function getLanguageFlag(language) {
  if (!language) return fallbackFlag();

  const langLower = language.toLowerCase().trim();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (!countryCode) return fallbackFlag();

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${language} flag`}
      className="h-3 w-auto inline-block"
    />
  );
}

/* FALLBACK FLAG */
function fallbackFlag() {
  return (
    <img
      src="https://flagcdn.com/24x18/un.png"
      alt="unknown language"
      className="h-3 w-auto inline-block opacity-70"
    />
  );
}
