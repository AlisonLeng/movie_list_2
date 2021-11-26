const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
const app = express()
const port = 3000



// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  // const movieList = [
  //   {
  //     id: 1,
  //     image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
  //     title: 'Jurassic World: Fallen Kingdom'
  //   }, {
  //     id: 2,
  //     image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg',
  //     title: 'Ant-Man and the Wasp'
  //   }, {
  //     id: 3,
  //     image: 'https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  //     title: 'Thor: Ragnarok'
  //   }, {
  //     id: 4,
  //     image: 'https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  //     title: 'Avengers: Infinity War'
  //   }, {
  //     id: 5,
  //     image: 'https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg',
  //     title: 'Mission: Impossible - Fallout'
  //   }, {
  //     id: 6,
  //     image: 'https://movie-list.alphacamp.io/posters/x1txcDXkcM65gl7w20PwYSxAYah.jpg',
  //     title: 'Incredibles 2'
  //   }, {
  //     id: 7,
  //     image: 'https://movie-list.alphacamp.io/posters/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg',
  //     title: 'MFifty Shades Freed'
  //   }, {
  //     id: 8,
  //     image: 'https://movie-list.alphacamp.io/posters/2slvblTroiT1lY9bYLK7Amigo1k.jpg',
  //     title: 'The First Purge'
  //   }

  // ]

  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const movies = movieList.results.filter((movie) => {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: req.query.keyword})
})

app.get('/movies/:movie_id', (req, res) => {
  console.log('movie_id', req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  // const movieOne = {
  //   id: 1,
  //   title: 'Jurassic World: Fallen Kingdom',
  //   description: `
  //   Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.   
  //   `,
  //   release_date: '2018-06-06',
  //   image: 'c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
  // }
  res.render('show', {movie: movie})
})

// start and listening on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})

