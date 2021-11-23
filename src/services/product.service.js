import api from "./api";

class ProductService {
  create(product) {
    return api.post("/products/add", product);
  }

  findAllProducts() {
    return api.get("/products/all");
  }

  addProductToCart(productCart) {
    return api.post("/products/cart/add", productCart);
  }

  removeProductFromCart(productCart) {
    return api.post("/products/cart/remove", productCart);
  }

  getUserProductCartItems(userId) {
    return api.get(`/products/user/${userId}/cart`);
  }

}

export default new ProductService();
