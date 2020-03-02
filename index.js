const express = require('express');
const cors = require('cors');
const app = express();

const labels = require('./routes/labels');
const memos = require('./routes/memos');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/labels', labels);
app.use('/memos', memos);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('DramanCompany Memoapp API');
  console.log(`Now listening on port ${port}`);
});
