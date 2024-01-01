package com.ecoomerce.sportscenter.service;

import com.ecoomerce.sportscenter.entity.Basket;
import com.ecoomerce.sportscenter.model.BasketResponse;

import java.util.List;

public interface BasketService {
    List<BasketResponse> getAllBaskets();
    BasketResponse getBasketById(String basketId);
    void deleteBasketById(String basketId);
    BasketResponse createBasket(Basket basket);
}
