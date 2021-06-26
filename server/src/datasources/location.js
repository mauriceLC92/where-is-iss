const { SQLDataSource } = require('datasource-sql');

class Location extends SQLDataSource {
    async getAllLocations() {
        const locations = await this.knex.select('*').from('locations');
        return locations.map((location) => {
            return {
                id: location.id,
                location: {
                    message: location.message,
                    timestamp: location.timestamp,
                    issPosition: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                },
            };
        });
    }

    getLocationById({ locationId }) {
        this.knex.select('*').from('locations').where({ id: locationId });
    }

    getLocationsInLastHour() {
        this.knex.select('*').from('locations');
    }
}

module.exports = Location;
