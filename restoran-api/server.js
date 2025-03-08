require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
console.log("MongoDB URI:", mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye bağlandı!"))
  .catch(err => console.error("Bağlantı hatası:", err));



// **Restoran Schema**
const restaurantSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  distance: String,
  workingHours: String,
  time: String,
  location: String,
  image: String, 
    products: [
        {
         categoryname: String,
        name: String,
        description: String,
        price: Number,
     image: String,
        }
      ],


});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// **Restoran Menüsü Schema**
const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  name: String,
  category: String,
  description: String,
  price: Number,
  image: String,
});

const RestaurantMenu = mongoose.model('RestaurantMenu', menuSchema);

// **Yeni Restoran Ekle (Ürünlerle birlikte)**
app.post('/api/restaurants', async (req, res) => {
    try {
      const { name, category, price, distance, workingHours, time, location, image, products } = req.body;
  
      // 1. Restoran ve ürünlerini aynı anda kaydet
      const newRestaurant = new Restaurant({
        name,
        category,
        price,
        distance,
        workingHours,
        time,
        location,
        image,
        products, // Ürünleri restoranın içine dahil et
      });
  
      await newRestaurant.save();
  
      res.status(201).json({ message: "Restoran ve ürünler kaydedildi", data: newRestaurant });
    } catch (err) {
      res.status(500).json({ error: "Restoran kaydedilemedi" });
    }
  });



// **Tüm Restoranları ve Menülerini Getir**
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: "Restoranlar alınamadı" });
  }
});


  
  
  
app.delete('/api/restaurants/:_id', async (req, res) => {
  const { _id } = req.params;

  // ID'nin geçerli bir ObjectId olup olmadığını kontrol et
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: 'Geçersiz ID formatı' });
  }

  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restoran bulunamadı" });
    }
    
    res.status(200).json({ message: "Restoran başarıyla silindi", restaurant });
  } catch (err) {
    console.error("Sunucu Hatası:", err);
    res.status(500).json({ error: "Restoran silinemedi", details: err.message });
  }
});



// **Server Başlat**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
