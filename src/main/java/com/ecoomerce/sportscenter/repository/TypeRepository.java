package com.ecoomerce.sportscenter.repository;

import com.ecoomerce.sportscenter.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {
}
