package com.ecoomerce.sportscenter.service;

import com.ecoomerce.sportscenter.entity.Product;
import com.ecoomerce.sportscenter.model.ProductResponse;
import com.ecoomerce.sportscenter.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponse getProductById(Integer productId) {
        log.info("Fetching Product by Id: {}", productId);
        Product product =productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product with given id doesn't exist"));
        //now convert the product to product response
        ProductResponse productResponse = convertToProductResponse(product);
        log.info("Fetched Product by Id: {}", productId);
        return productResponse;
    }

    @Override
    public List<ProductResponse> getProducts() {
        log.info("Fetching products");
        //Retrieve products from DB
        List<Product> productList = productRepository.findAll();
        //Map
        List<ProductResponse> productResponses = productList.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched all products");
        return productResponses;
    }


    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .productType(product.getType().getName())
                .productBrand(product.getBrand().getName())
                .build();
    }
}
