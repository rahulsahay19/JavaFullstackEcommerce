package com.ecoomerce.sportscenter.service;

import com.ecoomerce.sportscenter.model.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse getProductById(Integer productId);
    List<ProductResponse> getProducts();
}
