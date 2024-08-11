package com.montes.biblioteca.dto;

import java.io.Serializable;

import com.montes.biblioteca.entities.Book;

import jakarta.persistence.Column;

public class BookDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String sinopse;
    private Integer publicationYear;
    private String imgUrl;

    public BookDTO() {
    }

    public BookDTO(Book entity) {
        id = entity.getId();
        title = entity.getTitle();
        sinopse = entity.getSinopse();
        publicationYear = entity.getPublicationYear();
        imgUrl = entity.getImgUrl();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSinopse() {
        return sinopse;
    }

    public Integer getPublicationYear() {
        return publicationYear;
    }

    public String getImgUrl() {
        return imgUrl;
    }

}