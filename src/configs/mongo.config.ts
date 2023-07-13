import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => ({
  uri: getMongoString(configService),
  ...getMongoOptions(),
});

const getMongoString = (configService: ConfigService) => {
  let userinfoSection = '';
  if (configService.get('MONGO_LOGIN')) {
    userinfoSection = `${configService.get('MONGO_LOGIN')}:${configService.get(
      'MONGO_PASSWORD',
    )}@`;
  }
  return (
    'mongodb://' +
    userinfoSection +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTHDATABASE')
  );
};

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
