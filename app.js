// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//  Express 靜態檔案的資料夾位置
app.use(express.static('public'))

//搜尋
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filterRestaurantList = restaurantList.filter(
    data =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  )

  res.render("index", { restaurantList: filterRestaurantList, keywords })
})

// 設定路由
app.get("/", (req, res) => {
  res.render("index", { restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  const showRestaurant = restaurantList.find(data => data.id === Number(id))
  res.render('show', { restaurants: showRestaurant })
})



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})