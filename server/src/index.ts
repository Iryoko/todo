import "dotenv/config";
import express from "express";
import cors from "cors";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { routes } from "./features";
import { errorMiddleware } from "./middlewares/error";

function app() {
  const server = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      resave: false,
      secret: process.env.SESSION_SECRET ?? "secret",
      cookie: {
        maxAge: process.env.SESSION_LIFETIME
          ? parseInt(process.env.SESSION_LIFETIME)
          : 1000 * 60 * 60 * 24 * 365, // one year
        httpOnly: true,
        sameSite: "lax",
      },
    })
  );

  if (process.env.NODE_ENV === "production") {
    server.set("trust proxy", 1); // trust first proxy (nginx)
  }

  server.use("/api", routes);

  server.use(errorMiddleware);

  const port = process.env.PORT || 7000;

  server.listen(port, () => console.log(`Server started on localhost:${port}`));
}

app();
