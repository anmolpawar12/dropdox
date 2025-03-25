
package com.cmpe273.dropbox.backend.repository;


import com.cmpe273.dropbox.backend.entity.Files;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



public interface FileRepository extends CrudRepository<Files, Long> {



    List<Files> findAll();

    @Transactional
    @Modifying
    void deleteByFilepath(String filepath);





}