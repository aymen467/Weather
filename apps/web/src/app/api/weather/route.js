export async function GET(request) {
  try {
    const url = new URL(request.url);
    const city = url.searchParams.get("city");

    if (!city) {
      return Response.json(
        { error: "Le nom de la ville est requis" },
        { status: 400 },
      );
    }

    const apiKey = "fd4b98286bb0921242a462f73768e533";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;

    const response = await fetch(weatherUrl);

    if (!response.ok) {
      if (response.status === 404) {
        return Response.json({ error: "Ville non trouvée" }, { status: 404 });
      }
      throw new Error(`API Weather error: ${response.status}`);
    }

    const data = await response.json();

    // Formatage des données pour l'application
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000, // Convertir en km
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return Response.json(weatherData);
  } catch (error) {
    console.error("Weather API error:", error);
    return Response.json(
      {
        error: "Erreur lors de la récupération des données météo",
      },
      { status: 500 },
    );
  }
}
