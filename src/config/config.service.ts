import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: {} = {};

  constructor() {
    this.envConfig = this.readConfig();
  }

  getAll(): Object {
    return this.envConfig;
  }

  get(key: any): string {
    return this.envConfig[key];
  }

  getConfigByService(service: string) {
    const config = {
      default: {
        RABBITMQ_URL: process.env.RABBITMQ_URL,
        MONGO_DB_USER: process.env.MONGO_DB_USER,
        MONGO_DB_PASS: process.env.MONGO_DB_PASS,
        MONGO_DB_AUTH_SOURCE: process.env.MONGO_DB_AUTH_SOURCE,
      },
      users: {
        MONGODB_URL: process.env.USERS_MONGODB_URL,
        RMQ_USER_QUEUE: process.env.RMQ_USER_QUEUE
      },
      products: {
        MONGODB_URL: process.env.PRODUCTS_MONGODB_URL,
        RMQ_PRODUCT_QUEUE: process.env.RMQ_PRODUCT_QUEUE
      }
    };
    
    return {...config.default, ...(config[service] || config.default)};
  }

  private readConfig(): Object {
    let config: {} = {};

    Object
      .keys(process.env)
      .map(this.setConfigValueFromEnvVariable.bind(this, config));
    return config;
  }

  private setConfigValueFromEnvVariable(config: Object, value: string): void {
    config[value] = process.env[value];
  }
}
