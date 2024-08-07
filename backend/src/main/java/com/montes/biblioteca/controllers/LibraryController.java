package com.montes.biblioteca.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.montes.biblioteca.dto.PageDTO;
import com.montes.biblioteca.entities.Library;
import com.montes.biblioteca.services.LibraryService;

@RestController
@RequestMapping("/libraries")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping
    public ResponseEntity<Library> insert(@RequestBody Library library) {
        Library newLibrary = libraryService.insert(library);
        return ResponseEntity.ok(newLibrary);
    }

    @GetMapping
    public PageDTO<Library> findAll(Pageable pageable) {
        return libraryService.findAll(pageable);
    }
}