import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';

const config = new ConfigService()

console.log("All configurations >> ", config.getAll());

@Module({
  controllers: [ConfigController],
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService()
  }],
  exports: [ConfigService]
})
export class ConfigModule {}
