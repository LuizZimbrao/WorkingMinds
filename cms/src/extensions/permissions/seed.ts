export default async ({ strapi }) => {
  try {
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      throw new Error('Role "public" not found');
    }

    const entities = [
      'api::estado.estado',
      'api::pessoa.pessoa',
      'api::cidade.cidade',
    ];

    const actions = [
      'find',
      'findOne',
      'create',
      'update',
      'delete',
    ];

    await Promise.all(
      entities.map((entity) =>
        Promise.all(
          actions.map(async (action) => {
            const permission = await strapi.query('plugin::users-permissions.permission').findOne({
              where: {
                role: publicRole.id,
                action: `${entity}.${action}`,
              },
            });

            if (!permission) {
              await strapi.query('plugin::users-permissions.permission').create({
                data: {
                  action: `${entity}.${action}`,
                  role: publicRole.id,
                  enabled: true,
                },
              });
            } else {
              await strapi.query('plugin::users-permissions.permission').update({
                where: { id: permission.id },
                data: { enabled: true },
              });
            }
          })
        )
      )
    );

  } catch (error) {
    console.error('Erro ao configurar permissões:', error);
  }
};