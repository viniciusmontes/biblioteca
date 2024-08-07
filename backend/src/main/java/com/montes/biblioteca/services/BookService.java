package com.montes.biblioteca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.montes.biblioteca.entities.Book;
import com.montes.biblioteca.entities.Library;
import com.montes.biblioteca.repository.BookRepository;
import com.montes.biblioteca.repository.LibraryRepository;

import jakarta.transaction.Transactional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private LibraryRepository libraryRepository;

    @Transactional
    public Book insert(Book entity) {
        Library library = libraryRepository.findFirstLibrary();
        if (library == null) {
            throw new RuntimeException("No library found");
        }

        entity.setLibrary(library);
        library.getBooks().add(entity);

        return bookRepository.save(entity);
    }

    @Transactional
    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }
}