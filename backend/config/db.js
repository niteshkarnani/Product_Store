import { neon } from "@neondatabase/serverless";

import dotenv from "dotenv";
dotenv.config();

const {PGHOST,PGDATABASE,PGUSER,PGPASSWORD}=process.env;

export const sql=neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)


//postgresql://neondb_owner:npg_vDJb08AlOgYN@ep-quiet-mouse-a80wn6io-pooler.eastus2.azure.neon.tech/neondb?sslmode=require