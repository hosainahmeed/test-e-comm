export default function Login() {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <div className="w-full flex justify-center mt-6 md:mt-12 md:mb-[-0.5%] absolute -z-1">
        <h1 className="text-center opacity-10 font-extrabold tracking-tighter leading-[0.90] text-zinc-900 text-[clamp(4.5rem,8.5vw,25rem)] pointer-events-none select-none">
          DIVAN DIONE
        </h1>
      </div>
      <div className="text-gray-500 max-w-96 mx-4 backdrop-blur-xs md:p-6 p-4 text-left text-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Welcome back
        </h2>
        <form>
          <input
            id="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
          />
          <div className="text-right py-4">
            <a className="text-blue-600 underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white"
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Signup
          </a>
        </p>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Log in with Apple
        </button>
      </div>
    </div>
  );
}
