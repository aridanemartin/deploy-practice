import "#core/load-env.js";
import { envConstants } from "#core/constants/index.js";
import { connectToDBServer } from "#core/servers/db.server.js";
import { createRestApiServer } from "#core/servers/rest-api.server.js";
import { housesApi } from "#pods/house/index.js";
const app = createRestApiServer();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/houses", housesApi);
app.listen(3000, async () => {
    if (!envConstants.isApiMock) {
        console.log("Connected to DB");
        console.log(process.env.MONGODB_URI);
        await connectToDBServer(process.env.MONGODB_URI);
    }
    else {
        console.log("Running API mock");
    }
    console.log(`Server ready at port ${envConstants.PORT}`);
});
