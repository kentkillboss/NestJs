import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { PostgresModule } from './providers/postgres/provider.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './common/guards/role.guards';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UsersModule,
    PostgresModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
  ],
  controllers: [],
  providers: [
    RolesGuard,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
