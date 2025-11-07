import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";
import { User, Mail, LogOut, Settings, Info } from "lucide-react-native";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { signOut, signIn, isReady, auth } = useAuth();
  const { data: user, loading: userLoading } = useUser();

  const handleSignOut = async () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdf2f8",
        }}
      >
        <Text style={{ fontSize: 16, color: "#64748b" }}>Chargement...</Text>
      </View>
    );
  }

  if (!auth) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fdf2f8" }}>
        <StatusBar style="dark" />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 40,
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 24,
              padding: 32,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 8,
              borderWidth: 1,
              borderColor: "#f1f5f9",
            }}
          >
            <View
              style={{
                backgroundColor: "#fce7f3",
                borderRadius: 50,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <User color="#ec4899" size={48} />
            </View>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Bienvenue dans Météo App
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#64748b",
                textAlign: "center",
                lineHeight: 24,
                marginBottom: 32,
              }}
            >
              Connectez-vous pour personnaliser votre expérience et sauvegarder
              vos villes favorites
            </Text>

            <TouchableOpacity
              onPress={() => signIn()}
              style={{
                backgroundColor: "#ec4899",
                paddingHorizontal: 32,
                paddingVertical: 16,
                borderRadius: 16,
                shadowColor: "#ec4899",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf2f8" }}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Profil
        </Text>

        {/* Card profil utilisateur */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
            borderWidth: 1,
            borderColor: "#f1f5f9",
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <View
              style={{
                backgroundColor: "#fce7f3",
                borderRadius: 40,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <User color="#ec4899" size={40} />
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              {user?.name || "Utilisateur"}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f8fafc",
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
            }}
          >
            <Mail color="#64748b" size={20} />
            <Text
              style={{
                marginLeft: 12,
                fontSize: 16,
                color: "#1f2937",
                flex: 1,
              }}
            >
              {user?.email || "email@exemple.com"}
            </Text>
          </View>
        </View>

        {/* Menu options */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 4,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
            borderWidth: 1,
            borderColor: "#f1f5f9",
          }}
        >
          <MenuOption
            icon={<Settings color="#64748b" size={24} />}
            title="Paramètres"
            onPress={() => Alert.alert("Paramètres", "Fonctionnalité à venir")}
          />
          <MenuOption
            icon={<Info color="#64748b" size={24} />}
            title="À propos"
            onPress={() =>
              Alert.alert("À propos", "Météo App v1.0\nDéveloppé avec ❤️")
            }
            showBorder={false}
          />
        </View>

        {/* Bouton déconnexion */}
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: "#dc2626",
            borderRadius: 16,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#dc2626",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <LogOut color="white" size={20} />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Composant pour les options du menu
function MenuOption({ icon, title, onPress, showBorder = true }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: "#f1f5f9",
      }}
    >
      {icon}
      <Text
        style={{
          marginLeft: 16,
          fontSize: 16,
          color: "#1f2937",
          flex: 1,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
