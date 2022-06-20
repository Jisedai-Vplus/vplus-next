import React, { useEffect, useState } from 'react';

import { Text, useToast, Box, Link, Heading, Container, AspectRatio } from '@chakra-ui/react';
import WithSubnavigation from '../components/header';
import axios from 'axios';

const ViewView: React.FC = () => {

  const toast = useToast();
  const showError = (message: string) => {
    toast({
      duration: 3000,
      isClosable: false,
      render: () => (
        <Box color="white" rounded="lg" p={3} bg="#09958b">
          {message}
        </Box>
      ),
    })
  };

  const [recommendations, setRecommendations] = useState<any[]>([]); 
  const [topic, setTopic] = useState<string>("");
  // const [showRecommender, _] = useState<boolean>(false);
  const showRecommender = false; // TODO: If display previous topics, show the recommenders.

  const fetchRecommendations = async () => {
    const response = await axios.get("/api/recommendations/0").catch((error) => {showError("Unable to fetch recommendations.");});
    if (!response) return;
    const data = response.data;
    const entries = data.entries;
    setRecommendations(entries);
  };

  const fetchTopic = async() => {
    const response = await axios.get("/api/topics/latest").catch((error) => {showError("Unable to fetch latest topic.");});
    if (!response) return;
    const topic = response.data.topic;
    setTopic(topic.title);
  }

  useEffect(() => {
    fetchRecommendations();
    fetchTopic();
  }, []);

  return (
    <div>
      <WithSubnavigation />
      <Box border="1px" rounded="lg" my="3" borderColor="gray.200"><Heading as="h1">{topic}</Heading></Box>
      {
        recommendations.map((item, id) => {
          let url: string = item.source;
          if (url !== "" && !url.startsWith("http")) {
            url = "https://" + url
          }
          let displayElement = null;
          if (url.includes("bilibili")) {
            // find the BVid
            const p = url.indexOf("BV");
            if (p !== -1) {
              let q = url.indexOf("/", p);
              if (q===-1) q = url.length;
              const link = `https://player.bilibili.com/player.html?bvid=${url.substring(p, q)}&page=1`
              displayElement = 
              <Container textAlign="right">
                <AspectRatio ratio={4/3} maxW="1280px">
                  <iframe 
                    title="bilibili-video"
                    src={link} 
                    scrolling="no" 
                    frameBorder="no" 
                    allowFullScreen>
                  </iframe>
                </AspectRatio>
              </Container>
            }
          }
          return (
            <Box border='1px' rounded="lg" my='2' borderColor='gray.200' key={id}>
              <Text fontSize='xl' borderBottom="1px">
                {item.artist} - {item.title}
              </Text>
              <Text align="left" m='2'>
                {item.description}
              </Text>
              <Text align="right" m='2' fontSize="sm">
                {showRecommender ? <>{item.recommender}<br></br></> : ""}
                {
                  url !== ""
                  ? <Link href={url}>{item.source}</Link>
                  : ""
                }
              </Text>
              {displayElement /*TODO: Place this right-aligned.*/}
            </Box>
          )
        })
      }
    </div>
  );
};

export default ViewView;
