exports.seed = async function (knex) {
    await knex.schema.dropTableIfExists('locations');

    return knex.schema.createTable('locations', function (table) {
        table.increments('id');
        table.string('message');
        table.integer('timestamp');
        table.string('latitude');
        table.string('longitude');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
