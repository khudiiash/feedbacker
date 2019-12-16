const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://Dmytro:149600earthsun@cluster0-mwooj.mongodb.net/feedback?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const templatesRouter = require('./routes/templates');

app.use('/templates', templatesRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
      res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});