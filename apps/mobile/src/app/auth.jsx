import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/utils/auth/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { Mail, Chrome } from "lucide-react-native";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { signIn, isReady } = useAuth();

  const handleEmailSignIn = () => {
    try {
      // Ouvre la modal d'authentification par email/mot de passe
      signIn();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de se connecter. Veuillez réessayer.");
    }
  };

  const handleGoogleSignIn = () => {
    try {
      // Le système Anything gère automatiquement Google Sign-In via WebView
      signIn();
    } catch (error) {
      Alert.alert("Erreur", "Connexion Google échouée. Veuillez réessayer.");
    }
  };

  if (!isReady) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#fdf2f8", "#f3e8ff", "#e0e7ff"]}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <StatusBar style="dark" />

      {/* Logo/Titre */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>WeatherApp</Text>
        <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
      </View>

      {/* Boutons de connexion */}
      <View style={styles.buttonsContainer}>
        {/* Bouton Email/Mot de passe */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleEmailSignIn}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#ec4899", "#a855f7"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Mail size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Connexion par Email</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Bouton Google */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
        >
          <Chrome size={20} color="#4285F4" style={styles.buttonIcon} />
          <Text style={styles.secondaryButtonText}>Continuer avec Google</Text>
        </TouchableOpacity>
      </View>

      {/* Informations légales */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          En vous connectant, vous acceptez nos conditions d'utilisation
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 18,
    color: "#6b7280",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    maxWidth: 320,
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonIcon: {
    marginRight: 12,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
  footerContainer: {
    position: "absolute",
    bottom: 50,
    paddingHorizontal: 24,
  },
  footerText: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 16,
  },
});
