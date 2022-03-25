module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    email: {
      config: {
        provider: 'sendmail',
        settings: {
          defaultFrom: 'noreply@recipee.com',
          defaultReplyTo: 'juliasedefdjian@strapi.io',
          testAddress: 'nonamen31lead@gmail.com',
        },
      },
    },
    // ...
  });