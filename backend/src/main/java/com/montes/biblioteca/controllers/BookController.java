package com.montes.biblioteca.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.montes.biblioteca.entities.Book;
import com.montes.biblioteca.services.BookService;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Book> insert(@RequestBody Book book) {
        Book newBook = bookService.insert(book);
        return ResponseEntity.ok(newBook);
    }

    @GetMapping
    public ResponseEntity<Page<Book>> findAll(Pageable pageable) {
        Page<Book> result = bookService.findAll(pageable);
        return ResponseEntity.ok(result);
    }
}