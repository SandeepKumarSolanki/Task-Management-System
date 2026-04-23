import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './modules/organization/organization.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().allow(''),
        DB_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'production').required(),
      }),
    }),

    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: false, // Disable Sequelize query logging for cleaner output
      }),
    }),

    OrganizationModule,

    EmployeesModule,

    TasksModule,

    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
