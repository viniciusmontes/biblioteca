package com.montes.biblioteca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.montes.biblioteca.dto.BookDTO;
import com.montes.biblioteca.entities.Book;
import com.montes.biblioteca.entities.User;
import com.montes.biblioteca.repository.BookRepository;
import com.montes.biblioteca.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public BookDTO insert(BookDTO dto) {
        Book entity = new Book();
        copyDtoToEntity(dto, entity);
        entity = bookRepository.save(entity);
        return new BookDTO(entity);
    }

    @Transactional
    public BookDTO update(Long id, BookDTO dto) {
        try {
            Book entity = bookRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = bookRepository.save(entity);
            return new BookDTO(entity);

        } catch (EntityNotFoundException e) {
            throw new IllegalArgumentException("Id not found " + id);
        }
    }

    public void delete(Long id) {
        try {
            bookRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Id not found " + id);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Integrity violation");
        }
    }

    @Transactional
    public Page<BookDTO> findAllPaged(Pageable pageable) {
        Page<Book> list = bookRepository.findAll(pageable);
        return list.map(BookDTO::new);
    }

    public void copyDtoToEntity(BookDTO dto, Book entity) {
        entity.setTitle(dto.getTitle());
        entity.setSinopse(dto.getSinopse());
        entity.setPublicationYear(dto.getPublicationYear());
        entity.setImgUrl(dto.getImgUrl());
        entity.setBorrowed(false);
    }

    @Transactional
    public BookDTO borrowBook(Long bookId, Long userId) {
        Book book = bookRepository.getReferenceById(bookId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        book.setBorrowedBy(user);
        book.setBorrowed(true);
        book = bookRepository.save(book);
        return new BookDTO(book);
    }
}
