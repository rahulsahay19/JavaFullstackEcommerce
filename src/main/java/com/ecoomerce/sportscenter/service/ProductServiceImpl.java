package com.ecoomerce.sportscenter.service;

import com.ecoomerce.sportscenter.entity.Product;
import com.ecoomerce.sportscenter.exceptions.ProductNotFoundException;
import com.ecoomerce.sportscenter.model.ProductResponse;
import com.ecoomerce.sportscenter.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
                .orElseThrow(()->new ProductNotFoundException("Product with given id doesn't exist"));
        //now convert the product to product response
        ProductResponse productResponse = convertToProductResponse(product);
        log.info("Fetched Product by Id: {}", productId);
        return productResponse;
    }

    @Override
    public Page<ProductResponse> getProducts(Pageable pageable) {
        log.info("Fetching products");
        //Retrieve products from DB
        Page<Product> productPage = productRepository.findAll(pageable);
        //Map
        Page<ProductResponse> productResponses = productPage
                .map(this::convertToProductResponse);
        log.info("Fetched all products");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductsByName(String keyword) {
        log.info("Searching product(s) by name: {}", keyword);
        //Call the custom query Method
        List<Product> products = productRepository.searchByName(keyword);
        //Map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched all products");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductsByBrand(Integer brandId) {
        log.info("Searching product(s) by brandId: {}", brandId);
        //Call the custom query Method
        List<Product> products = productRepository.searchByBrand(brandId);
        //Map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched all products");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductsByType(Integer typeId) {
        log.info("Searching product(s) by typeId: {}", typeId);
        //Call the custom query Method
        List<Product> products = productRepository.searchByType(typeId);
        //Map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched all products");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductsByBrandandType(Integer brandId, Integer typeId) {
        log.info("Searching product(s) by brandId: {}, and typeId: {}", brandId, typeId);
        //Call the custom query Method
        List<Product> products = productRepository.searchByBrandAndType(brandId, typeId);
        //Map
        List<ProductResponse> productResponses = products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched all products");
        return productResponses;
    }

    @Override
    public List<ProductResponse> searchProductsByBrandTypeAndName(Integer brandId, Integer typeId, String keyword) {
        log.info("Searching product(s) by brandId: {}, typeId: {} and keyword: {}", brandId, typeId, keyword);
        //Call the custom query Method
        List<Product> products = productRepository.searchByBrandTypeAndName(brandId, typeId, keyword);
        //Map
        List<ProductResponse> productResponses = products.stream()
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
