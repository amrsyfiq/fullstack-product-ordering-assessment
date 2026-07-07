import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

/**
 * Validates process.env at startup so the app fails fast with a clear message
 * when required configuration is missing or malformed, rather than surfacing
 * an obscure connection error later.
 */
export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number;

  @IsString()
  @IsNotEmpty()
  CORS_ORIGIN: string;
}

const DEFAULTS: Record<string, string> = {
  DB_HOST: 'localhost',
  DB_PORT: '5433',
  DB_USERNAME: 'assessment',
  DB_PASSWORD: 'assessment',
  DB_DATABASE: 'assessment',
  PORT: '3001',
  CORS_ORIGIN: 'http://localhost:3000',
};

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const merged = { ...DEFAULTS, ...config };
  const validated = plainToInstance(EnvironmentVariables, merged, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(
      `Invalid environment configuration:\n${errors
        .map(
          (e) =>
            `  - ${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`,
        )
        .join('\n')}`,
    );
  }
  return validated;
}
