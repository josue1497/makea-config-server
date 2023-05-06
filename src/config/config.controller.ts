import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ConfigService } from './config.service';

@Controller()
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @MessagePattern({ cmd: "get" })
  getKey(key: string): string {
    return this.configService.get(key);
  }

  @MessagePattern({ cmd: "getAll" })
  getAll(): Object {
    return this.configService.getAll();
  }

  @MessagePattern({ cmd: "getCofigByService" })
  getByService(service: string): Object {
    return this.configService.getConfigByService(service);
  }
}
