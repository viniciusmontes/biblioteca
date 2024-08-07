package com.montes.biblioteca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.montes.biblioteca.dto.PageDTO;
import com.montes.biblioteca.entities.Book;
import com.montes.biblioteca.entities.Library;
import com.montes.biblioteca.repository.LibraryRepository;

import jakarta.transaction.Transactional;

@Service
public class LibraryService {

    @Autowired
    private LibraryRepository libraryRepository;

    @Transactional
    public Library insert(Library entity) {
        Library library = new Library();
        library.setName(entity.getName());
        library.setAddress(entity.getAddress());

        for (Book book : entity.getBooks()) {
            book.setLibrary(library);
            library.getBooks().add(book);
        }

        return libraryRepository.save(library);
    }

    @Transactional
    public PageDTO<Library> findAll(Pageable pageable) {
        Page<Library> result = libraryRepository.findAll(pageable);
        return new PageDTO<>(
                result.getContent(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages());
    }
}
