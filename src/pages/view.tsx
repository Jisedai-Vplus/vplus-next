import React, { useEffect, useState } from 'react';

import { Textarea, Text, useToast, Box, Container, Link } from '@chakra-ui/react';
import WithSubnavigation from '../components/header';
import axios from 'axios';

const ViewView: React.FC = () => {
  const toast = useToast();
  const [recommendations, setRecommendations] = useState<any[]>([]); 
  useEffect(() => {
    fetchRecommendations();
  }, []);
  const fetchRecommendations = async () => {
    const response = await axios.get("/api/recommendations/0").catch((error) => {
      console.log(error);
      toast({
        duration: 3000,
        isClosable: false,
        render: () => (
          <Box color="white" rounded="lg" p={3} bg="#09958b">
            Unable to fetch recommendations.
          </Box>
        ),
      })
    });
    if (!response) return;
    const data = response.data;
    const entries = data.entries;
    setRecommendations(entries);
  }
  return (
    <div>
      <WithSubnavigation />
      {
        recommendations.map((item, id) => {
          let url: string = item.source;
          if (url !== "" && !url.startsWith("http")) {
            url = "https://" + url
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
                {item.recommender}
                <br></br>
                {
                  url !== ""
                  ? <Link href={url}>{item.source}</Link>
                  : ""
                }
              </Text>
            </Box>
          )
        })
      }
    </div>
  );
};

export default ViewView;
