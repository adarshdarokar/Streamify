import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <>
      {/* INLINE ANIMATIONS */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }

        .fade-in { animation: fadeIn 0.8s ease-out; }
        .slide-up { animation: slideUp 0.8s ease-out; }
        .slide-right { animation: slideRight 1s ease-out; }
        .pop-in { animation: popIn 0.25s ease-out; }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-base-200 to-base-100"
        data-theme="forest"
      >
        <div
          className="
            border border-primary/25 
            flex flex-col lg:flex-row 
            w-full max-w-5xl mx-auto 
            bg-base-100/70 backdrop-blur-xl 
            rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.15)] 
            overflow-hidden fade-in
            gap-6 lg:gap-0
          "
        >
          {/* LOGIN FORM SECTION */}
          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col slide-up">
            {/* LOGO */}
            <div className="mb-4 flex items-center justify-start gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <ShipWheelIcon className="size-9 text-primary" />
              </div>

              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <div className="alert alert-error mb-4 pop-in shadow">
                <span>{error.response?.data?.message}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full">
              <div className="space-y-4">
                <div className="slide-up">
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2 slide-up">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full hover:scale-[1.01] transition-all focus:ring-2 ring-primary"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2 slide-up">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full hover:scale-[1.01] transition-all focus:ring-2 ring-primary"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="
                      btn btn-primary w-full rounded-lg shadow-lg 
                      hover:scale-[1.03] active:scale-[0.98] 
                      transition-all duration-300 slide-up
                    "
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4 fade-in">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* IMAGE SECTION */}
          <div
            className="
              w-full lg:w-1/2 
              bg-primary/10 
              flex items-center justify-center 
              slide-right 
              p-6
            "
          >
            <div className="w-full max-w-xs sm:max-w-sm mx-auto">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/i.png"
                  alt="Language connection illustration"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-500"
                />
              </div>

              <div className="text-center space-y-3 mt-6 fade-in">
                <h2 className="text-xl font-semibold">
                  Connect with language partners worldwide
                </h2>
                <p className="opacity-70">
                  Practice conversations, make friends, and improve your language skills together
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginPage;
