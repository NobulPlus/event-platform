const locationCoordinates: Record<string, { latitude: number; longitude: number }> = {
    'San Francisco': { latitude: 37.7749, longitude: -122.4194 },
    'New York': { latitude: 40.7128, longitude: -74.0060 },
    'London': { latitude: 51.5074, longitude: -0.1278 },
  };
  
  export async function getWeather(location: string) {
    const coords = locationCoordinates[location];
    if (!coords) return null;
  
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code`
      );
      const data = await response.json();
      return {
        temperature: data.current.temperature_2m,
        condition: getWeatherCondition(data.current.weather_code),
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      return null;
    }
  }
  
  function getWeatherCondition(code: number): string {
    const conditions: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
    };
    return conditions[code] || 'Unknown';
  }