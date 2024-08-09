package com.montes.biblioteca.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.montes.biblioteca.entities.Book;
import com.montes.biblioteca.services.BookService;

import jakarta.validation.Valid;

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

    @PutMapping(value = "/{id}")
    public ResponseEntity<Book> update(@PathVariable Long id, @Valid @RequestBody Book dto) {
        dto = bookService.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping
    public ResponseEntity<Page<Book>> findAll(Pageable pageable) {
        Page<Book> result = bookService.findAll(pageable);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}