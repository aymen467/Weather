import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-pink-100">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Déconnexion
        </h1>

        <button
          onClick={handleSignOut}
          className="w-full rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-3 text-base font-medium text-white transition-all hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 shadow-lg"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
