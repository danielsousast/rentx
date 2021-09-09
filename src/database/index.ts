import { Database } from "@nozbe/watermelondb";
import SQLAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schemas from "./schema";

import User from "./models/User";
import Car from "./models/Car";

const adapter = new SQLAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [User, Car],
  actionsEnabled: true,
});
