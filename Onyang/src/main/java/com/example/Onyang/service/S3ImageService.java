// package com.example.Onyang.service;

// import com.amazonaws.services.s3.AmazonS3;
// import com.amazonaws.services.s3.model.CannedAccessControlList;
// import com.amazonaws.services.s3.model.DeleteObjectRequest;
// import com.amazonaws.services.s3.model.GetObjectRequest;
// import com.amazonaws.services.s3.model.ObjectMetadata;
// import com.amazonaws.services.s3.model.PutObjectRequest;
// import com.amazonaws.services.s3.model.S3Object;
// import com.amazonaws.util.IOUtils;
// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
// import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.ByteArrayInputStream;
// import java.io.IOException;
// import java.io.InputStream;
// import java.io.UnsupportedEncodingException;
// import java.net.MalformedURLException;
// import java.net.URL;
// import java.net.URLDecoder;
// import java.util.Arrays;
// import java.util.List;
// import java.util.Objects;
// import java.util.UUID;
// import java.util.stream.Collectors;

// @Slf4j
// @RequiredArgsConstructor
// @Component
// public class S3ImageService {

//     private final AmazonS3 amazonS3;

//     @Value("${cloud.aws.s3.bucketName}")
//     private String bucketName;

//     public List<String> uploadMultiple(List<MultipartFile> images) {
//         return images.stream()
//                 .map(this::uploadImage)
//                 .collect(Collectors.toList());
//     }

//     private String uploadImage(MultipartFile image) {
//         if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) {
//             throw new RuntimeException("Empty file exception");
//         }
//         this.validateImageFileExtension(image.getOriginalFilename());
//         try {
//             return this.uploadImageToS3(image);
//         } catch (IOException e) {
//             throw new RuntimeException("IO exception on image upload");
//         }
//     }

//     private void validateImageFileExtension(String filename) {
//         int lastDotIndex = filename.lastIndexOf(".");
//         if (lastDotIndex == -1) {
//             throw new RuntimeException("No file extension");
//         }

//         String extension = filename.substring(lastDotIndex + 1).toLowerCase();
//         List<String> allowedExtensionList = Arrays.asList("jpg", "jpeg", "png", "gif");

//         if (!allowedExtensionList.contains(extension)) {
//             throw new RuntimeException("Invalid file extension");
//         }
//     }

//     private String uploadImageToS3(MultipartFile image) throws IOException {
//         String originalFilename = image.getOriginalFilename();
//         String extension = originalFilename.substring(originalFilename.lastIndexOf("."));

//         String s3FileName = UUID.randomUUID().toString().substring(0, 10) + originalFilename;

//         InputStream is = image.getInputStream();
//         byte[] bytes = IOUtils.toByteArray(is);

//         ObjectMetadata metadata = new ObjectMetadata();
//         metadata.setContentType("image/" + extension);
//         metadata.setContentLength(bytes.length);
//         ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

//         try {
//             PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName, byteArrayInputStream, metadata)
//                     .withCannedAcl(CannedAccessControlList.PublicRead);
//             amazonS3.putObject(putObjectRequest);
//         } catch (Exception e) {
//             throw new RuntimeException("Put object exception");
//         } finally {
//             byteArrayInputStream.close();
//             is.close();
//         }

//         return amazonS3.getUrl(bucketName, s3FileName).toString();
//     }

//     public void deleteImageFromS3(String imageAddress) {
//         String key = getKeyFromImageAddress(imageAddress);
//         try {
//             amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
//         } catch (Exception e) {
//             throw new RuntimeException("IO exception on image delete");
//         }
//     }

//     private String getKeyFromImageAddress(String imageAddress) {
//         try {
//             URL url = new URL(imageAddress);
//             String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
//             return decodingKey.substring(1);
//         } catch (MalformedURLException | UnsupportedEncodingException e) {
//             throw new RuntimeException("IO exception on image delete");
//         }
//     }

//     public byte[] getImage(String key) {
//         try {
//             S3Object object = amazonS3.getObject(new GetObjectRequest(bucketName, key));
//             ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//             byte[] buffer = new byte[1024];
//             int len;
//             while ((len = object.getObjectContent().read(buffer)) != -1) {
//                 outputStream.write(buffer, 0, len);
//             }
//             return outputStream.toByteArray();
//         } catch (IOException e) {
//             throw new RuntimeException("Error while getting image from S3: " + e.getMessage());
//         }
//     }
// }
