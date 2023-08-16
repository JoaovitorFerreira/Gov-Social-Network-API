import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://0.0.0.0:27017'),
    // sudo docker run -d -p 27017:27017 mongo to run the container
    /*await mongoose.connect(
        'mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin',
      ),*/
  },
];
