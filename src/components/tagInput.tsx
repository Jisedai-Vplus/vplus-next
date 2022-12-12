import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { FormControl, Stack, Input, Heading } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Tags = (props: { data: any; handleDelete: any }) => {
  return (
    <Tag size={'md'} height={8} borderRadius="full" variant="outline" marginLeft={1}>
      <TagLabel>{props.data}</TagLabel>
      <TagCloseButton
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          props.handleDelete(props.data);
        }}
      />
    </Tag>
  );
};

const TagInput = () => {
  const [tags, SetTags] = useState<Array<string>>(['miku', 'one']);
  const [tagValue, SetTagValue] = useState<string>('');

  const [parent, enableAnimations] = useAutoAnimate({
    duration: 20,
    easing: 'linear',
    disrespectUserMotionPreference: false,
  });

  const handleDelete = (value: any) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
  };
  const handleOnSubmit = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      SetTags([...tags, tagValue]);
      SetTagValue('');
    }
  };
  return (
    <AnimatePresence>
      <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }} flexWrap={'wrap'}>
        {tags.map((data, index) => {
          return (
            <motion.div layout>
              <Tags data={data} handleDelete={handleDelete} key={index} />
            </motion.div>
          );
        })}
        <motion.div layout>
          <Input
            size={'sm'}
            borderRadius="full"
            maxHeight={8}
            verticalAlign={'top'}
            width={24}
            key="input"
            value={tagValue}
            onChange={(event) => SetTagValue(event.target.value)}
            onKeyPress={handleOnSubmit}
            marginLeft={1}
          />
        </motion.div>
      </Box>
    </AnimatePresence>
  );
};

export default TagInput;
