package com.example.Onyang.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Spring 애플리케이션이 시작될 때 가장 먼저 로드
@Configuration
public class S3Config {
    // @Value 어노테이션을 사용해서 application.properties에 작성해둔 값 가져옴
    // AWS 인증에 필요한 정보 가져옴
    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;
    @Value("${cloud.aws.region.static}")
    private String region;

    
    // Bean으로 등록하여 Spring에서 관리할 수 있는 객체로 생성
    @Bean
    public AmazonS3 amazonS3() {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        
        return AmazonS3ClientBuilder
        //자격 증명, aws 리전 설정 후 AmazonS3 클라이언트 생성
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(region)
                .build();
    }

}