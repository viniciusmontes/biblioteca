package com.montes.biblioteca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.montes.biblioteca.entities.Book;
import com.montes.biblioteca.repository.BookRepository;

import jakarta.transaction.Transactional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Transactional
    public Book insert(Book entity) {
        Book book = new Book();
        book.setTitle(entity.getTitle());
        book.setImgUrl(entity.getImgUrl());
        book.setPublicationYear(entity.getPublicationYear());
        book.setSinopse(entity.getSinopse());

        return bookRepository.save(book);
    }

    @Transactional
    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }
}