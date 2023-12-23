package com.ecoomerce.sportscenter.service;

import com.ecoomerce.sportscenter.entity.Type;
import com.ecoomerce.sportscenter.model.TypeResponse;
import com.ecoomerce.sportscenter.repository.TypeRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class TypeServiceImpl implements TypeService {
    private final TypeRepository typeRepository;

    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    @Override
    public List<TypeResponse> getAllTypes() {
        log.info("Fetching all Types");
        //Fetch Types from DB
        List<Type> typeList = typeRepository.findAll();
        //now use stream operator to map with response
        List<TypeResponse> typeResponses = typeList.stream()
                .map(this::convertToTypeResponse)
                .collect(Collectors.toList());
        log.info("Fetched all Types");
        return typeResponses;
    }

    private TypeResponse convertToTypeResponse(Type type) {
        return TypeResponse.builder()
                .id(type.getId())
                .name(type.getName())
                .build();
    }
}
