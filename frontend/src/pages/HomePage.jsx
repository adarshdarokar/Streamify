import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { capitialize } from "../lib/utils";
import { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = ({ showOnlyFriends = false }) => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
    enabled: !showOnlyFriends,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs?.length > 0) {
      outgoingFriendReqs.forEach((req) => outgoingIds.add(req.recipient._id));
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-base-content">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Your Friends
          </h2>

          {!showOnlyFriends && (
            <Link
              to="/notifications"
              className="px-5 py-2 rounded-full bg-base-100 shadow hover:bg-base-300 transition flex items-center gap-2"
            >
              <UsersIcon className="size-4" />
              Friend Requests
            </Link>
          )}
        </div>

        {/* FRIEND CARDS SECTION */}
        {loadingFriends ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="
                  bg-base-100 rounded-2xl shadow-md hover:shadow-xl 
                  p-6 flex flex-col items-center gap-4
                  transition-all duration-300 hover:-translate-y-1
                "
              >
                {/* Avatar - CLEAN CIRCLE */}
                <div className="avatar size-24 rounded-full shadow-md ring-2 ring-primary/20">
                  <img
                    src={friend.profilePic}
                    alt={friend.fullName}
                    className="rounded-full"
                  />
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold">{friend.fullName}</h3>

                {/* Location */}
                {friend.location && (
                  <p className="flex items-center text-xs opacity-70">
                    <MapPinIcon className="size-3 mr-1" />
                    {friend.location}
                  </p>
                )}

                {/* LANGUAGES */}
                <div className="w-full text-center bg-base-200 p-3 rounded-xl">
                  <p className="text-xs font-medium opacity-80">
                    Native: {capitialize(friend.nativeLanguage)}
                  </p>
                  <p className="text-xs opacity-70">
                    Learning: {capitialize(friend.learningLanguage)}
                  </p>
                </div>

                <div className="mt-auto"></div>
              </div>
            ))}
          </div>
        )}

        {/* RECOMMENDATIONS SECTION */}
        {!showOnlyFriends && (
          <section className="space-y-8">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">
                Meet New Learners
              </h2>
              <p className="opacity-70 mt-1">
                Discover perfect language exchange partners.
              </p>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-16">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="rounded-xl bg-base-100 p-6 shadow-md text-center">
                <h3 className="font-semibold">No recommendations available</h3>
                <p className="opacity-70 text-sm">
                  Check back later for new partners!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="
                        bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl 
                        flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1
                      "
                    >
                      {/* Top Section */}
                      <div className="flex items-center gap-4">
                        {/* Fixed Avatar (no square background) */}
                        <div className="avatar size-14 rounded-full shadow-md ring-2 ring-base-content/20">
                          <img className="rounded-full" src={user.profilePic} alt="" />
                        </div>

                        <div>
                          <h3 className="font-semibold">{user.fullName}</h3>
                          {user.location && (
                            <p className="text-xs opacity-70 flex items-center">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-primary badge-sm gap-1 px-3 py-1.5 rounded-full shadow">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitialize(user.nativeLanguage)}
                        </span>

                        <span className="badge badge-outline badge-sm gap-1 px-3 py-1.5 rounded-full">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {/* Bio */}
                      {user.bio && (
                        <p className="text-sm opacity-70 line-clamp-3">
                          {user.bio}
                        </p>
                      )}

                      {/* Button */}
                      <button
                        className={`
                          btn btn-sm w-full rounded-full mt-auto
                          ${
                            hasRequestBeenSent
                              ? "btn-disabled bg-base-300/60"
                              : "btn-primary hover:scale-[1.03]"
                          }
                        `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Request
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
