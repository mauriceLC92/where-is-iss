exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('location')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('location').insert([
                {
                    message: 'success',
                    timestamp: 1624740331,
                    latitude: '-21.2041',
                    longitude: '-93.8205',
                },
            ]);
        });
};
