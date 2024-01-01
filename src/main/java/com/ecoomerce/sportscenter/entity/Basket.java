package com.ecoomerce.sportscenter.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@RedisHash("Basket")
public class Basket {
    @Id
    private String id;
    private List<BasketItem> items = new ArrayList<>();
    public Basket(String id){
        this.id = id;
    }
}
