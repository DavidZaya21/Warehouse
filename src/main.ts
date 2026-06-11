import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { Request, Response } from 'express';
import { join } from 'node:path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3000);
  const openApiPath = join(process.cwd(), 'docs', 'openapi.yaml');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.get('/openapi.yaml', (_request: Request, response: Response) => {
    response.sendFile(openApiPath);
  });

  expressApp.get('/docs', (_request: Request, response: Response) => {
    response.type('html').send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Warehouse API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
      body { margin: 0; background: #f3f6fb; }
      .topbar { display: none; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.SwaggerUIBundle({
          url: "/openapi.yaml",
          dom_id: "#swagger-ui",
          deepLinking: true,
          presets: [window.SwaggerUIBundle.presets.apis],
        });
      };
    </script>
  </body>
</html>`);
  });

  await app.listen(port);

  console.log(`Warehouse backend listening on http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/docs`);
  console.log(`OpenAPI YAML available at http://localhost:${port}/openapi.yaml`);
}

void bootstrap();
