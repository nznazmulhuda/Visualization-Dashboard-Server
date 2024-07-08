// import all technologies
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Config
const app = express();
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pbmq8lu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Connect to MongoDB
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // All database and collection operations
        const AllData = client
            .db("VisualizationDashboard")
            .collection("allData");

        // Routes
        app.get("/allData", async (req, res) => {
            const { region, country, topic, sector, pestle, source, filter } =
                req.query;
            const data = await AllData.find().toArray();

            // all data
            if (
                !region &&
                !country &&
                !topic &&
                !sector &&
                !pestle &&
                !source &&
                !filter
            ) {
                return res.send(data);
            }

            // all region name
            if (region && region === "true") {
                let allRegion = [];
                data.map((item) => {
                    if (!allRegion.includes(item.region.toLowerCase())) {
                        allRegion.push(item.region.toLowerCase());
                    }
                });
                return res.send(allRegion);
            }

            // all data based on region name
            if ((region !== true || region !== "true") && region) {
                // all data based on region name
                if (region && !topic) {
                    const filteredData = await AllData.find({
                        region: { $eq: region },
                    }).toArray();
                    return res.send(filteredData);
                }

                // filter region name by the topic
                if (region && topic) {
                    const filteredData = await AllData.find({
                        region: { $eq: region },
                        topic: { $eq: topic },
                    }).toArray();
                    return res.send(filteredData);
                }
            }

            // all country name
            if (country && country === "true") {
                let allCountry = [];
                data.map((item) => {
                    if (!allCountry.includes(item.country.toLowerCase())) {
                        allCountry.push(item.country.toLowerCase());
                    }
                });
                return res.send(allCountry);
            }

            // all data based on country name
            if ((country !== true || country !== "true") && country) {
                // all data based on country name
                if (!topic) {
                    const filteredData = await AllData.find({
                        country: { $eq: country },
                    }).toArray();
                    return res.send(filteredData);
                }
                // filter country name by the topic
                if (topic !== "true") {
                    const filteredData = await AllData.find({
                        country: { $eq: country },
                        topic: { $eq: topic },
                    }).toArray();
                    return res.send(filteredData);
                }
            }

            // all topic name
            if (topic && topic === "true") {
                let allTopic = [];
                data.map((item) => {
                    if (!allTopic.includes(item.topic.toLowerCase())) {
                        allTopic.push(item.topic.toLowerCase());
                    }
                });
                return res.send(allTopic);
            }

            // all data based on topic name
            if ((topic !== true || topic !== "true") && topic) {
                const filteredData = await AllData.find({
                    topic: { $eq: topic },
                }).toArray();
                return res.send(filteredData);
            }

            // all sector name
            if (sector && sector === "true") {
                let allSector = [];
                data.map((item) => {
                    if (!allSector.includes(item.sector.toLowerCase())) {
                        allSector.push(item.sector.toLowerCase());
                    }
                });
                return res.send(allSector);
            }

            // all data based on sector name
            if ((sector !== true || sector !== "true") && sector) {
                const filteredData = await AllData.find({
                    sector: { $eq: sector },
                }).toArray();
                return res.send(filteredData);
            }

            // all pestle name
            if (pestle && pestle === "true") {
                let allPestle = [];
                data.map((item) => {
                    if (!allPestle.includes(item.pestle.toLowerCase())) {
                        allPestle.push(item.pestle.toLowerCase());
                    }
                });
                return res.send(allPestle);
            }

            // all data based on pestle name
            if ((pestle !== true || pestle !== "true") && pestle) {
                const filteredData = await AllData.find({
                    pestle: { $eq: pestle },
                }).toArray();
                return res.send(filteredData);
            }

            // all source name
            if (source && source === "true") {
                let allSource = [];
                data.map((item) => {
                    if (!allSource.includes(item.source.toLowerCase())) {
                        allSource.push(item.source.toLowerCase());
                    }
                });
                return res.send(allSource);
            }

            // all data based on source name
            if ((source !== true || source !== "true") && source) {
                const filteredData = await AllData.find({
                    source: { $eq: source },
                }).toArray();
                return res.send(filteredData);
            }
        });
    } catch (err) {
        // database error
        console.error("Failed to connect to MongoDB", err);
    }
}
run().catch(console.dir);

// Server is ready
app.get("/", (req, res) => {
    res.send(`Server is running...`);
});

// Start the server
app.listen(port);
