# Weather App - React Native

## Description
Cette application mobile permet aux utilisateurs de consulter la météo pour différentes villes. L'application est développée avec **React Native (TypeScript)** et utilise **Firebase Authentication** pour la connexion et **OpenWeatherMap API** pour récupérer les données météorologiques.

---

## Écrans

### 1. Écran de connexion
- Authentification par e-mail et mot de passe via Firebase.
- Option de connexion Google.
- Après connexion, accès à l'écran principal (recherche météo).

### 2. Écran de recherche météo
- Champ de recherche en haut pour rechercher des villes.
- Liste des résultats avec possibilité de développer/réduire chaque élément.
- Informations météorologiques affichées :  
  - **Réduit** : ville, température, icône météo  
  - **Développé** : humidité, vent, pression, etc.
- Animations de chargement pendant les appels API.
- Gestion appropriée des erreurs.

---

## Services tiers
### Firebase
- Configuration d'un projet Firebase.
- Fournisseurs activés : e-mail/mot de passe et Google Sign-In.
- Console Firebase : [https://console.firebase.google.com](https://console.firebase.google.com)

### OpenWeatherMap API
- Utilisation de l'offre gratuite.
- Clé API nécessaire : `YOUR_API_KEY`
- Exemple d'appel API :  
```http
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
