package com.fitness.aiservice.service;

import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListener {
    private final ActivityAIService activityAIService;
    private final RecommendationRepository repository;

    @KafkaListener(topics = "${kafka.topic.name}" , groupId = "activity-processor-group")
    public void processActivity(Activity activity) {
        log.info("Activity Received from kafka is : {}", activity.getUserId());
        Recommendation receommendation = activityAIService.generateRecommendations(activity);
        repository.save(receommendation);
    }

}
