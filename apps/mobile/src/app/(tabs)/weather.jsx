import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Droplets,
  Wind,
  Eye,
  Thermometer,
  Gauge,
} from "lucide-react-native";
import { useQuery } from "@tanstack/react-query";

export default function WeatherScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCities, setSearchedCities] = useState([]);
  const [expandedCities, setExpandedCities] = useState({});

  const searchWeather = async (city) => {
    if (!city.trim()) return;

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`,
      );
      if (!response.ok) {
        throw new Error("Ville non trouvée");
      }
      const data = await response.json();

      // Ajouter la nouvelle ville à la liste si elle n'y est pas déjà
      setSearchedCities((prev) => {
        const exists = prev.some(
          (c) => c.city.toLowerCase() === data.city.toLowerCase(),
        );
        if (!exists) {
          return [data, ...prev.slice(0, 9)]; // Garder seulement les 10 dernières recherches
        }
        return prev;
      });
      setSearchQuery("");
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de trouver les données météo pour cette ville",
      );
    }
  };

  const toggleExpanded = (cityName) => {
    setExpandedCities((prev) => ({
      ...prev,
      [cityName]: !prev[cityName],
    }));
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "🌤️";
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf2f8" }}>
      <StatusBar style="dark" />

      {/* Header avec recherche */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          backgroundColor: "#fdf2f8",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Météo App
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            marginBottom: 20,
            borderWidth: 2,
            borderColor: "#f8fafc",
          }}
        >
          <Search color="#94a3b8" size={20} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 16,
              color: "#1f2937",
            }}
            placeholder="Rechercher une ville..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => searchWeather(searchQuery)}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => searchWeather(searchQuery)}
              style={{
                backgroundColor: "#ec4899",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12,
                marginLeft: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Rechercher
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Liste des villes */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {searchedCities.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#64748b",
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              Recherchez une ville pour voir la météo
            </Text>
          </View>
        ) : (
          searchedCities.map((weather, index) => (
            <TouchableOpacity
              key={`${weather.city}-${index}`}
              onPress={() => toggleExpanded(weather.city)}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 6,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#f1f5f9",
              }}
            >
              {/* Vue compacte */}
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: 4,
                    }}
                  >
                    {weather.city}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#64748b",
                      textTransform: "capitalize",
                    }}
                  >
                    {weather.description}
                  </Text>
                </View>

                <View style={{ alignItems: "center", marginRight: 16 }}>
                  <Text style={{ fontSize: 36 }}>
                    {getWeatherIcon(weather.icon)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginTop: 4,
                    }}
                  >
                    {weather.temperature}°C
                  </Text>
                </View>

                {expandedCities[weather.city] ? (
                  <ChevronUp color="#ec4899" size={24} />
                ) : (
                  <ChevronDown color="#94a3b8" size={24} />
                )}
              </View>

              {/* Vue détaillée */}
              {expandedCities[weather.city] && (
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    borderTopWidth: 1,
                    borderTopColor: "#f1f5f9",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginTop: 16,
                    }}
                  >
                    <DetailItem
                      icon={<Thermometer color="#ec4899" size={20} />}
                      label="Ressenti"
                      value={`${weather.feelsLike}°C`}
                    />
                    <DetailItem
                      icon={<Droplets color="#3b82f6" size={20} />}
                      label="Humidité"
                      value={`${weather.humidity}%`}
                    />
                    <DetailItem
                      icon={<Wind color="#10b981" size={20} />}
                      label="Vent"
                      value={`${weather.windSpeed} m/s`}
                    />
                    <DetailItem
                      icon={<Gauge color="#f59e0b" size={20} />}
                      label="Pression"
                      value={`${weather.pressure} hPa`}
                    />
                    <DetailItem
                      icon={<Eye color="#8b5cf6" size={20} />}
                      label="Visibilité"
                      value={`${weather.visibility} km`}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 16,
                      paddingTop: 16,
                      borderTopWidth: 1,
                      borderTopColor: "#e5e7eb",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#64748b",
                          marginBottom: 4,
                        }}
                      >
                        Lever du soleil
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        {weather.sunrise}
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#64748b",
                          marginBottom: 4,
                        }}
                      >
                        Coucher du soleil
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        {weather.sunset}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Composant pour les détails météo
function DetailItem({ icon, label, value }) {
  return (
    <View
      style={{
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      {icon}
      <View style={{ marginLeft: 8 }}>
        <Text style={{ fontSize: 14, color: "#64748b" }}>{label}</Text>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#1f2937" }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
