import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { useAuth } from "@/utils/auth/useAuth";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const { isReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isReady) {
      if (isAuthenticated) {
        // Utilisateur connecté -> Home
        router.replace("/home");
      } else {
        // Utilisateur non connecté -> Auth
        router.replace("/auth");
      }
    }
  }, [isReady, isAuthenticated]);

  // Écran de chargement pendant la vérification de l'auth
  if (!isReady) {
    return (
      <LinearGradient
        colors={["#fdf2f8", "#f3e8ff", "#e0e7ff"]}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <Text style={styles.appTitle}>WeatherApp</Text>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </LinearGradient>
    );
  }

  // Fallback - ne devrait pas être atteint
  return <Redirect href={isAuthenticated ? "/home" : "/auth"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    alignItems: "center",
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
});
