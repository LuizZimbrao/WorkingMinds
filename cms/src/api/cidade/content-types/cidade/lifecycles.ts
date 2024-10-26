const { ApplicationError } = require("@strapi/utils").errors;

export default {
  async beforeDeleteMany(event) {
    const { where } = event.params;

    const cities = await strapi.db.query('api::cidade.cidade').findMany({
      where,
      populate: ['pessoas'],
    });
    
    cities?.forEach(city => {
      if (city?.pessoas?.length > 0) {
        throw new ApplicationError(`Não é possível remover as cidades selecionadas, pois há pessoas associadas a alguma delas.`);
      }
    })
  },
  async beforeDelete(event) {
    const { where } = event.params;

    const cities = await strapi.db.query('api::cidade.cidade').findOne({
      where,
      populate: ['pessoas'],
    });

    if (cities && cities?.pessoas?.length > 0) {
      throw new ApplicationError('Não é possível remover a cidade, pois há pessoas associadas a ela.');
    }
  },
};
