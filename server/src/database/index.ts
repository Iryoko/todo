import knex from "knex";
const knexfile = require("../../knexfile");
const env = process.env.NODE_ENV || "development";

export const db = knex(knexfile[env]);
