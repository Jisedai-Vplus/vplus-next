import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Text, useToast, 
  Box, 
  Heading, 
  FormControl, FormLabel, Input, FormErrorMessage, 
  Textarea, 
  // AlertDialog, 
  // AlertDialogOverlay, 
  // AlertDialogHeader, 
  // AlertDialogBody, 
  // AlertDialogFooter, 
  // AlertDialogContent,
  // useDisclosure,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
} from '@chakra-ui/react';
import WithSubnavigation from '../components/header';
import axios from 'axios';

const ContributeView: React.FC = () => {

  const toast = useToast();
  const showToast = (message: string, color: string = "#09958b") => {
    toast({
      duration: 3000,
      isClosable: false,
      render: () => (
        <Box color="white" rounded="lg" p={3} bg={color}>
          {message}
        </Box>
      ),
    })
  };

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [recommender, setRecommender] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState<string>("");
  
  const fetchTopic = async() => {
    const response = await axios.get("/api/topics/latest").catch((error) => {showToast("Unable to fetch latest topic.");});
    if (!response) return;
    const topic = response.data.topic;
    setTopic(topic.title);
  }

  useEffect(() => {
    fetchTopic();
  }, []);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const submitDialogueCancelRef: any = React.useRef();
  // const submitDialogue = (
  //   <AlertDialog 
  //     isOpen={isOpen} 
  //     leastDestructiveRef={submitDialogueCancelRef} 
  //     onClose={onClose}
  //   >
  //     <AlertDialogOverlay>
  //       <AlertDialogContent>
  //         <AlertDialogHeader fontSize='lg' fontWeight='bold'>
  //           提交小作文
  //         </AlertDialogHeader>
  //         <AlertDialogBody>
  //           提交以下推荐曲目
  //           题目：{title}
  //           作家：{artist}
  //         </AlertDialogBody>
  //         <AlertDialogFooter>
  //           <Button ref={submitDialogueCancelRef} onClick={onClose}>取消</Button>
  //           <Button colorScheme="blue" onClick={onClose} ml={3}>确定</Button>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialogOverlay>
  //   </AlertDialog>
  // );

  const submitClicked = () => {
    axios.post("/api/recommendations/0", {
      title: title,
      artist: artist,
      description: description,
      recommender: recommender,
      source: source,
    }).then(() => {
      showToast("提交成功。")
    }).catch((reason) => {
      showToast(reason.response.data);
    });
  };

  const formElement = 
  <Box border="2px" rounded="lg" my="3" borderColor="gray.300">
    <Heading as="h2">投稿</Heading>
    <hr></hr>
    <Text>本期主题: {topic}</Text>
    <FormControl p="3"
      isInvalid={title===""}
      isRequired
    >
      <FormLabel htmlFor="title">曲名</FormLabel>
      <Input id="title" value={title} 
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      {title !== "" ? (null) : (
        <FormErrorMessage>必填。</FormErrorMessage>
      )}
    </FormControl>
      
    <FormControl p="3"
      isInvalid={artist===""}
      isRequired
    >
      <FormLabel htmlFor="artist">P主</FormLabel>
      <Input id="artist" value={artist} 
        onChange={(e) => setArtist(e.target.value)}
        ></Input>
      {artist !== "" ? (null) : (
        <FormErrorMessage>必填。</FormErrorMessage>
      )}
    </FormControl>
      
    <FormControl p="3"
      isInvalid={recommender===""}
      isRequired
    >
      <FormLabel htmlFor="recommender">投稿人</FormLabel>
      <Input id="recommender" value={recommender} 
        onChange={(e) => setRecommender(e.target.value)}
      ></Input>
      {recommender !== "" ? (null) : (
        <FormErrorMessage>必填。</FormErrorMessage>
      )}
    </FormControl>
      
    <FormControl p="3">
      <FormLabel htmlFor="source">链接</FormLabel>
      <Input id="source" value={source} onChange={(e) => setSource(e.target.value)}></Input>
    </FormControl>

    <FormControl p="3">
      <FormLabel htmlFor="description">小作文/想说的话</FormLabel>
      <Textarea 
        id="description" value={description} 
        onChange={(e) => setDescription(e.target.value)}
        height="8rem"
      ></Textarea>
    </FormControl>

    <Button 
      p="3" mb="3" colorScheme="blue" onClick={submitClicked}
      disabled={title==="" || artist==="" || recommender===""}
    >提交</Button>

  </Box>;
  // TODO: 显示本期主题。
  return (
    <div>
      <WithSubnavigation />
      {formElement}
      {/* {submitDialogue} */}
    </div>
  );
}

export default ContributeView;