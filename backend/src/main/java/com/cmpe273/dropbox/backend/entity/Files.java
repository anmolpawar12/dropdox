package com.cmpe273.dropbox.backend.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Files {

    String filename;

    @Id
    String filepath;

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

}
