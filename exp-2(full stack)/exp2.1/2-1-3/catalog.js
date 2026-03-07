const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");

const variantSchema = new mongoose.Schema({
  sku: String,
  color: String,
  price: Number,
  stock: Number
});

const reviewSchema = new mongoose.Schema({
  userId: String,
  rating: Number,
  comment: String
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: Number
});

const Product = mongoose.model("Product", productSchema);

async function insertData() {

await Product.deleteMany({});

await Product.create([
{
name: "T-Shirt",
category: "Clothing",
variants: [
{ sku: "12345-B", color: "red", size: "S", price: 19.99, stock: 0 }
],
reviews: [
{ userId: "u1", rating: 4, comment: "Good quality" }
],
avgRating: 4
},

{
name: "Hoodie",
category: "Clothing",
variants: [
{ sku: "96765-B", color: "Black", size: "M", price: 35.99, stock: 2 }
],
reviews: [
{ userId: "u2", rating: 5, comment: "Very comfortable" }
],
avgRating: 5
},

{
name: "Laptop",
category: "Electronic",
variants: [
{ sku: "LP-1", color: "Gray", price: 899.99, stock: 20 }
],
reviews: [
{ userId: "u3", rating: 3, comment: "Average performance" }
],
avgRating: 3
}
]);

console.log("Products Inserted");

}

insertData();