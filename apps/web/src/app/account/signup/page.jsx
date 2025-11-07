import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Impossible de démarrer l'inscription. Veuillez réessayer.",
        OAuthCallback:
          "Échec de l'inscription après redirection. Veuillez réessayer.",
        OAuthCreateAccount:
          "Impossible de créer un compte avec cette option. Essayez-en une autre.",
        EmailCreateAccount:
          "Cet e-mail ne peut pas être utilisé. Il est peut-être déjà enregistré.",
        Callback:
          "Quelque chose s'est mal passé lors de l'inscription. Veuillez réessayer.",
        OAuthAccountNotLinked:
          "Ce compte est lié à une autre méthode de connexion. Essayez avec celle-ci.",
        CredentialsSignin:
          "E-mail ou mot de passe invalide. Si vous avez déjà un compte, essayez de vous connecter.",
        AccessDenied: "Vous n'avez pas l'autorisation de vous inscrire.",
        Configuration:
          "L'inscription ne fonctionne pas en ce moment. Veuillez réessayer plus tard.",
        Verification:
          "Votre lien d'inscription a expiré. Demandez-en un nouveau.",
      };

      setError(
        errorMessages[err.message] ||
          "Quelque chose s'est mal passé. Veuillez réessayer.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-pink-100"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Créer un compte
        </h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="overflow-hidden rounded-lg border border-pink-200 bg-white px-4 py-3 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400">
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                className="w-full bg-transparent text-lg outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="overflow-hidden rounded-lg border border-pink-200 bg-white px-4 py-3 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400">
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-transparent text-lg outline-none"
                placeholder="Créez un mot de passe"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-3 text-base font-medium text-white transition-all hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:opacity-50 shadow-lg"
          >
            {loading ? "Création..." : "Créer le compte"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <a
              href={`/account/signin${
                typeof window !== "undefined" ? window.location.search : ""
              }`}
              className="text-pink-500 hover:text-pink-600 font-medium"
            >
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default MainComponent;
