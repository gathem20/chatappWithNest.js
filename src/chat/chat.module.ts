import { Module } from '@nestjs/common';
import { chatgateway } from './gatewaye';

@Module({
    providers:[chatgateway]
})
export class ChatModule {}
