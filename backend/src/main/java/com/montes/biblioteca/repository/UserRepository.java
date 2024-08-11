package com.montes.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.montes.biblioteca.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
}
