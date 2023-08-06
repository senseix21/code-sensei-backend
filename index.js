const cors = require('cors');
const express = require('express');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t32indv.mongodb.net/code-sensei?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const connectDB = async () => {
    try {
        const db = client.db('code-sensei')
        const projectCollection = db.collection('projects');

        //Get All projects
        app.get('/projects', async (req, res) => {
            const result = await projectCollection.find({}).toArray();
            res.send(result);
        });

        //get single project
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const result = await projectCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });




    } finally {

    }
}


connectDB().catch((err) => { console.error(err) });

app.get('/', (req, res) => {
    res.send('Hello from code sensei')
});

app.listen(port, () => {
    console.log('listening on port ' + port)
});