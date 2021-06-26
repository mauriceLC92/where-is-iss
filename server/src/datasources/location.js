const { SQLDataSource } = require('datasource-sql');

class Location extends SQLDataSource {
    getAllLocations() {
        this.knex.select('*').from('location');
    }

    getLocationById({ locationId }) {
        this.knex.select('*').from('location').where({ id: locationId });
    }

    getLocationsInLastHour() {
        this.knex.select('*').from('location');
    }
}

module.exports = Location;
