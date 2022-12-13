import { AddIcon, SmallAddIcon } from '@chakra-ui/icons';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const TagControlled = (props: {
  id: string;
  data: any;
  handleDelete: any;
  tagCounts: number;
  oneResult: string;
}) => {
  let resultColor: any = undefined;
  if (props.oneResult === 'just') resultColor = 'teal';
  else if (props.oneResult === 'near') resultColor = 'yellow';
  else if (props.oneResult === 'miss') resultColor = 'red';
  else resultColor = undefined;
  console.log(resultColor);
  return (
    <Tag
      size={'md'}
      height={8}
      borderRadius="full"
      variant="outline"
      marginLeft={1}
      colorScheme={resultColor}
    >
      <TagLabel>{props.data}</TagLabel>
      <TagCloseButton
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          props.handleDelete(props.id);
        }}
      />
    </Tag>
  );
};

interface TagItem {
  id: string;
  data: string;
  oneResult: string;
}

const TagInput = (props: {
  postId: number;
  onSet: (e: Array<string>) => any;
  oneResult: string;
  checkCounts: number;
}) => {
  const inputcolor = useColorModeValue('gray.500' /*'#39c5bb'*/, 'gray.600');
  /*
  const overwriteLocalEntries = (incomingEntries: Array<any>, key: string, itemkey: string) => {
    let existingEntries = JSON.parse(localStorage.getItem(key)!);
    if (existingEntries == null) existingEntries = [];
    let hash = Object.create(null);
    existingEntries.forEach((obj: { [x: string]: string | number }) => (hash[obj[itemkey]] = obj));
    incomingEntries.forEach((obj) => Object.assign(hash[obj[itemkey]], obj));
    localStorage.setItem(key, JSON.stringify(existingEntries));
  };
  */
  const loadLocalAttemptTags = () => {
    let existingAttempts = JSON.parse(localStorage.getItem('attempts')!);
    if (existingAttempts == null) existingAttempts = {};
    let existingTags: Array<any> = [];
    if (existingAttempts[props.postId]) existingTags = existingAttempts[props.postId];
    return existingTags;
  };

  const updateLocalAttemptTags = (incomingEntries: Array<TagItem>) => {
    let existingAttempts = JSON.parse(localStorage.getItem('attempts')!);
    if (existingAttempts == null) existingAttempts = {};
    existingAttempts[props.postId] = incomingEntries;
    localStorage.setItem('attempts', JSON.stringify(existingAttempts));
  };

  const [tags, SetTags] = useState<Array<TagItem>>(loadLocalAttemptTags());
  const [tagValue, SetTagValue] = useState<string>('');
  const [tagCounts, SetTagCounts] = useState<number>(0);

  const handleDelete = (key: any) => {
    let newtags = tags.filter((obj) => obj.id !== key);
    SetTags(newtags);
    // props.onSet(newtags.map((s) => s.data));
    updateLocalAttemptTags(newtags);
  };
  const handleOnSubmit = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const uniqueId = uid();
      let newtags = [...tags, { id: uniqueId, data: tagValue, oneResult: 'blank' }];
      SetTags(newtags);
      SetTagValue('');
      // props.onSet(newtags.map((s) => s.data));
      updateLocalAttemptTags(newtags);
    }
  };
  const handleOnClickAddTags = (e: any) => {
    const uniqueId = uid();
    let newtags = [...tags, { id: uniqueId, data: tagValue, oneResult: 'blank' }];
    SetTags(newtags);
    SetTagValue('');
    // props.onSet(newtags.map((s) => s.data));
    updateLocalAttemptTags(newtags);
  };

  useEffect(() => {
    if (props.checkCounts !== 0) {
      const newtags = tags.map((s) => ({ id: s.id, data: s.data, oneResult: props.oneResult }));
      SetTags(newtags);
      updateLocalAttemptTags(newtags);
    }
  }, [props.checkCounts]);

  useEffect(() => {
    props.onSet(tags.map((s) => s.data));
    // updateLocalAttemptTags(tags);
  }, [tags]);

  return (
    <AnimatePresence>
      <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }} flexWrap={'wrap'} verticalAlign={'top'}>
        {tags.map((item, index) => {
          return (
            <motion.div layout>
              <TagControlled
                data={item.data}
                handleDelete={handleDelete}
                id={item.id}
                key={item.id}
                tagCounts={tagCounts}
                oneResult={item.oneResult}
              />
            </motion.div>
          );
        })}
        <motion.div layout>
          <InputGroup
            size={'sm'}
            maxHeight={8}
            verticalAlign={'top'}
            width={28}
            marginLeft={1}
            color={inputcolor}
          >
            <InputLeftElement
              children={<AddIcon sx={{ cursor: 'pointer' }} onClick={handleOnClickAddTags} />}
            />
            <Input
              size={'sm'}
              borderRadius="full"
              maxHeight={8}
              verticalAlign={'top'}
              width={28}
              key="input"
              value={tagValue}
              onChange={(event) => SetTagValue(event.target.value)}
              onKeyPress={handleOnSubmit}
            />
          </InputGroup>
        </motion.div>
      </Box>
    </AnimatePresence>
  );
};

export default TagInput;
