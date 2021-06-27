const { SQLDataSource } = require('datasource-sql');

class Location extends SQLDataSource {
    async getAllLocations() {
        const locations = await this.knex.select('*').from('location');
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
        this.knex.select('*').from('location').where({ id: locationId });
    }

    getLocationsInLastHour() {
        this.knex.select('*').from('location');
    }

    async insertLocation(location) {
        const { message, timestamp, issPosition } = location;
        console.log('location', location);
        const test = await this.knex('location')
            .returning([
                'id',
                'message',
                'timestamp',
                // 'created_at',
                'latitude',
                'longitude',
            ])
            .insert({
                message,
                timestamp,
                latitude: issPosition.latitude,
                longitude: issPosition.longitude,
            });
        console.log('test', test);
        return test[0];
    }
}

module.exports = Location;
