import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger implements NestLoggerService {
  log(message: any, context?: string) {
    this.print('INFO', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.print('ERROR', message, context, trace);
  }

  warn(message: any, context?: string) {
    this.print('WARN', message, context);
  }

  private print(level: string, message: any, context?: string, trace?: string) {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${level.toUpperCase()}${context ? ` [${context}]` : ''} ${message}`;
    if (trace) {
      console.error(log, '\n', trace);
    } else {
      console.log(log);
    }
  }
}
