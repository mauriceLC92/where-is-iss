const { SQLDataSource } = require('datasource-sql');

const locationMapper = (location) => {
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
};

class Location extends SQLDataSource {
    async getAllLocations() {
        const locations = await this.knex.select('*').from('location');
        return locations.map(locationMapper);
    }

    async getLocationById({ locationId }) {
        const res = await this.knex
            .select('*')
            .from('location')
            .where({ id: locationId });
        const location = res[0];
        return locationMapper(location);
    }

    async getLocationsInLastHour() {
        const HOUR = 1000 * 60 * 60;
        const anHourAgo = parseInt(((Date.now() - HOUR) / 1000).toFixed(0));
        const lastHourLocations = await this.knex
            .select('*')
            .from('location')
            .where('timestammp', '>', anHourAgo);
        return lastHourLocations.map(locationMapper);
    }

    async insertLocation(location) {
        const { message, timestamp, issPosition } = location;
        try {
            const test = await this.knex('location')
                .returning([
                    'id',
                    'message',
                    'timestamp',
                    'latitude',
                    'longitude',
                ])
                .insert({
                    message,
                    timestamp,
                    latitude: issPosition.latitude,
                    longitude: issPosition.longitude,
                });
            return test[0];
        } catch (err) {
            console.log('err', err);
        }
    }
}

module.exports = Location;
