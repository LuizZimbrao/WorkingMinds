export default {
  async beforeDeleteMany(event) {
    const { where } = event.params;

    const state = await strapi.db.query('api::estado.estado').findMany({
      where,
      populate: ['cidades'],
    });
    

    console.log('>>>>>>>state', state);
    

    /* if (state && state.cidades.length > 0) {
      throw new Error('Não é possível remover o estado, pois há cidades associadas a ele.');
    } */
  },
  async beforeDelete(event) {
    const { where } = event.params;

    const state = await strapi.db.query('api::estado.estado').findOne({
      where,
      populate: ['cidades'],
    });

    if (state && state.cidades.length > 0) {
      throw new Error('Não é possível remover o estado, pois há cidades associadas a ele.');
    }
  },
};