package com.ecoomerce.sportscenter.repository;

import com.ecoomerce.sportscenter.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    @Query("SELECT p FROM Product p where p.name LIKE %:keyword%")
    List<Product> searchByName(@Param("keyword") String keyword);
}
