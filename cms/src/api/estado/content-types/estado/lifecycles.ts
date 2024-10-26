const { ApplicationError } = require("@strapi/utils").errors;

export default {
  async beforeDeleteMany(event) {
    const { where } = event.params;

    const states = await strapi.db.query('api::estado.estado').findMany({
      where,
      populate: ['cidades'],
    });
    

    states?.forEach(state => {
      if (state?.cidades?.length > 0) {
        throw new ApplicationError(`Não é possível remover os estados selecionado, pois há cidades associadas a alguns deles.`);
      }
    })
  },
  async beforeDelete(event) {
    const { where } = event.params;

    const state = await strapi.db.query('api::estado.estado').findOne({
      where,
      populate: ['cidades'],
    });

    

    if (state && state?.cidades?.length > 0) {
      throw new ApplicationError('Não é possível remover o estado, pois há cidades associadas a ele.');
    }
  },
};
