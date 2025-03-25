package com.cmpe273.dropbox.backend.controller;

import com.cmpe273.dropbox.backend.service.FileService;
import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/files")
public class FileController {
    @Autowired
    private FileService fileService;

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    public ResponseEntity<com.cmpe273.dropbox.backend.entity.Files> fileupload(@RequestParam("file") MultipartFile multipartFile) throws JSONException {



        com.cmpe273.dropbox.backend.entity.Files newFile = new com.cmpe273.dropbox.backend.entity.Files();

        try {

            byte[] bytes = multipartFile.getBytes();
            Path path = Paths.get(multipartFile.getOriginalFilename());
            Files.write(path, bytes);
            newFile.setFilename(multipartFile.getOriginalFilename());
            newFile.setFilepath(multipartFile.getOriginalFilename());

            fileService.uploadFile(newFile);


        } catch (IOException e) {
            e.printStackTrace();

                return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);

        }


        return new ResponseEntity<com.cmpe273.dropbox.backend.entity.Files>(newFile, HttpStatus.OK);
    }


    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<com.cmpe273.dropbox.backend.entity.Files>> getFiles() {

        List<com.cmpe273.dropbox.backend.entity.Files> files = fileService.getFiles();
        List<com.cmpe273.dropbox.backend.entity.Files> filesList = new ArrayList<>(files);

        return new ResponseEntity(filesList, HttpStatus.OK);
    }

    @PostMapping(path = "/delete", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteFile(@RequestBody com.cmpe273.dropbox.backend.entity.Files file) throws JSONException {

        Path path = Paths.get(file.getFilename());

            try {
                Files.delete(path);
                fileService.deleteFile(file.getFilepath());

            } catch (IOException e) {
                e.printStackTrace();

                    return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);

            }

        return new ResponseEntity(null, HttpStatus.OK);

    }



    @GetMapping(path = "/{filename}"/*, produces = MediaType.APPLICATION_JSON_VALUE*/)
    public ResponseEntity<InputStreamResource> downloadFile(@RequestParam String filepath, @PathVariable("filename") String filename) {

        File file2Upload = new File(filepath);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.set(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=" + filename.replace(" ", "_"));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        InputStreamResource resource = null;
        try {
            resource = new InputStreamResource(new FileInputStream(file2Upload));
        } catch (FileNotFoundException e) {
            e.printStackTrace();

                return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);

        }

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file2Upload.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }

}