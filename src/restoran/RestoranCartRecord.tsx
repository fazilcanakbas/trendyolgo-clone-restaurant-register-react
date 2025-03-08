import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../restoran/RestorantCardRecord.css';
import { ObjectId } from 'mongoose';


const categories = ["Burger", "Pizza", "Döner", "Sokak Lezzetleri", "Kahve","Tatlı","Balık","Kebap",];


const RestaurantForm = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([{ name: '', categoryname: '', price: '', description: '', image: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [restaurants, setRestaurants] = useState<any[]>([]);

  // Restoran bilgilerini kaydet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const newRestaurant = {
      name: restaurantName,
      category: category,
      price: Number(price),
      products: products,
      location: location,
      time: time,
      distance: distance,
      image: image,
      workingHours: workingHours
    };

    try {
      const response = await axios.post('http://192.168.116.88:5000/api/restaurants', newRestaurant);
      setMessage(response.data.message);
      console.log('Restoran kaydedildi:', response.data);

      // Formu sıfırla
      setRestaurantName('');
      setCategory('');
      setPrice('');
      setLocation('');
      setTime('');
      setDistance('');
      setImage('');
      setWorkingHours('');
      setProducts([{ name: '', categoryname: '', price: '', description: '', image: '' }]);

      // Restoranları güncelle
      fetchRestaurants();
    } catch (error) {
      setMessage('Restoran kaydedilemedi!');
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Restoranları API'den al
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://192.168.116.88:5000/api/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Restoranlar alınamadı:', error);
    }
  };

  // Ürün ekleme fonksiyonu
  const handleAddProduct = () => {
    setProducts([...products, { name: '', categoryname: '', price: '', description: '', image: '' }]);
  };

  // Ürün bilgilerini güncelleme
  const handleProductChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...products];
    values[index][event.target.name as keyof typeof values[0]] = event.target.value;
    setProducts(values);
  };

  const handleDeleteRestaurant = async (_id: ObjectId) => {
    try {
      // API'ye doğru id'yi gönderiyoruz
      const response = await axios.delete(`http://192.168.116.88:5000/api/restaurants/${_id}`);
      console.log('Restoran silindi:', response.data);
      setMessage("Restoran başarıyla silindi");
      // Silme işlemi sonrası listeyi yeniden alabilir veya güncelleyebilirsiniz
      fetchRestaurants();  // Listeyi güncellemek için bir fonksiyon ekleyebilirsiniz
    } catch (error) {
      console.error('Hata:', error);
      setMessage('Restoran silinemedi!');
    }
  };
  
  
  

  useEffect(() => {
    fetchRestaurants(); // Component yüklendiğinde restoranları getir
  }, []);

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h2>Yeni Restoran Ekle</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          {/* Restoran ekleme formu */}
          <div className="form-group">
            <label>Restoran Adı:</label>
            <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Konum(Semt Adı):</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="form-group">
      <label>Kategori:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Kategori seçiniz</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <p>Seçilen Kategori: {category}</p>
    </div>
          <div className="form-group">
            <label>Minimum Sepet Tutarı:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Süre (Lütfen İki Değer Aralığı Giriniz (örn: 40-50dk))</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mesafe (örn: 2.1 km)</label>
            <input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Çalışma Saatleri</label>
            <input type="text" value={workingHours} placeholder="13:00-02:00" onChange={(e) => setWorkingHours(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Restoran Fotoğrafı</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
          </div>

          {/* Ürün ekleme formu */}
          <div className="form-group">
            <label>Ürünler:</label>
            {products.map((product, index) => (
              <div key={index} className="product-form">
                <input type="text" placeholder="Ürün Adı" name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} required />
                <input type="text" placeholder="Ürün Kategorisi" name="categoryname" value={product.categoryname} onChange={(e) => handleProductChange(index, e)} required />
                <input type="text" placeholder="Ürün Açıklaması" name="description" value={product.description} onChange={(e) => handleProductChange(index, e)} required />
                <input type="number" placeholder="Ürün Fiyatı" name="price" value={product.price} onChange={(e) => handleProductChange(index, e)} required />
                <input type="text" placeholder="Ürün Fotoğrafı URL" name="image" value={product.image} onChange={(e) => handleProductChange(index, e)} required />
              </div>
            ))}
            <button type="button" onClick={handleAddProduct}>Ürün Ekle</button>
          </div>

          <button type="submit" disabled={loading}>{loading ? 'Kaydediliyor...' : 'Restoranı Kaydet'}</button>
        </form>

        {/* Restoranları listele ve sil */}
        <div>
          <h3>Restoranlar</h3>
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-list-item">
              <p>{restaurant.name}</p>
              <button onClick={() => handleDeleteRestaurant(restaurant._id)}>Sil</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantForm;
