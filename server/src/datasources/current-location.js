const { RESTDataSource } = require('apollo-datasource-rest');

class CurrentLocationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.open-notify.org/iss-now.json';
  }

  async getCurrentLocation() {
    const currentLocation = await this.get('');
    return this.currentLocationReducer(currentLocation)
  }

  currentLocationReducer(currentLocation) {
    const { latitude, longitude } = currentLocation.iss_position;
    return {
      message: currentLocation.message,
      timestamp: currentLocation.timestamp,
      issPosition: {
        latitude: latitude,
        longitude: longitude
      },
    };
  }
}

module.exports = CurrentLocationAPI;