package com.montes.biblioteca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.montes.biblioteca.entities.Book;
import com.montes.biblioteca.repository.BookRepository;

import jakarta.persistence.EntityNotFoundException;
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
    public Book update(Long id, Book dto) {
        try {
            Book entity = bookRepository.getReferenceById(id);
            entity.setTitle(dto.getTitle());
            entity.setSinopse(dto.getSinopse());
            entity.setPublicationYear(dto.getPublicationYear());
            entity.setImgUrl(dto.getImgUrl());
            return bookRepository.save(entity);
        } catch (EntityNotFoundException e) {
            throw new IllegalArgumentException("Id not found " + id);
        }
    }

    public void delete(Long id) {
		try {
			bookRepository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new IllegalArgumentException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new IllegalArgumentException("Integrity violation");
		}
	}

    @Transactional
    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }
}