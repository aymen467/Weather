import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/utils/auth/useAuth";
import { useUser } from "@/utils/auth/useUser";
import { LinearGradient } from "expo-linear-gradient";
import { LogOut, User, Cloud } from "lucide-react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { data: user, loading } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const navigateToWeather = () => {
    router.push("/(tabs)/weather");
  };

  if (loading) {
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

      {/* Header avec informations utilisateur */}
      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <User size={24} color="#ec4899" />
          </View>
          <View>
            <Text style={styles.welcomeText}>Bienvenue !</Text>
            <Text style={styles.emailText}>{user?.email || "Utilisateur"}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <LogOut size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>WeatherApp</Text>
        <Text style={styles.subtitle}>
          Consultez la météo de n'importe quelle ville dans le monde
        </Text>

        {/* Bouton principal vers la météo */}
        <TouchableOpacity
          style={styles.weatherButton}
          onPress={navigateToWeather}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#ec4899", "#a855f7"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Cloud size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Voir la Météo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Section fonctionnalités */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Fonctionnalités</Text>

        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🌤️</Text>
            <Text style={styles.featureText}>Météo en temps réel</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🔍</Text>
            <Text style={styles.featureText}>Recherche par ville</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📊</Text>
            <Text style={styles.featureText}>Détails complets</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 100,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingVertical: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  emailText: {
    fontSize: 14,
    color: "#6b7280",
  },
  signOutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  weatherButton: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 36,
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  featuresContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#374151",
  },
});
