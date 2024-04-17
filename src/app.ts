import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server";

(async () => {
    main()
})();



async function main() {
    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })


    // const prisma = new PrismaClient();


    // const newLog = await LogModel.create({
    //     level: "low",
    //     message: "test message from Mongo",
    //     origin: "app.ts",
    // });

    // await newLog.save();

    // console.log(newLog)
    
    ServerApp.start();
}