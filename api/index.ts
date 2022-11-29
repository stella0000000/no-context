const googleApi = require('./googleApi')
const redditApi = require('./redditApi')
const app = require('express')();
const { v4 } = require('uuid');
require('dotenv').config();

app.get('/api', (req: any, res: any) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req: any, res: any) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
  
});


app.get("/api/google_sentiment", async (req: any, res: any) => {
  const query = req.query.query

  try {
    const response = await googleApi(query)
    res.send(response)
  } catch(err) {
    console.log(err)
  }
});

app.get("/api/reddit", async (req: any, res: any) => {
    const { query } = req.query

    try {
      const response = await redditApi(query)
      res.send(response)
    } catch(err) {
      console.log(err)
    }
});
  
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
