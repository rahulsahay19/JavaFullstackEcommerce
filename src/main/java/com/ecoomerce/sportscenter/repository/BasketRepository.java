package com.ecoomerce.sportscenter.repository;

import com.ecoomerce.sportscenter.entity.Basket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends CrudRepository<Basket, String> {
}
