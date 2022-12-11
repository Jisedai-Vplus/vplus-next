import { Button, Editable, EditableInput, EditablePreview, Tag } from '@chakra-ui/react';
import { FormControl, Stack, Input, Heading } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useRef, useState } from 'react';

const Tags = (props: { data: any; handleDelete: any }) => {
  return (
    <Tag>
      <Stack direction="row" gap={1}>
        <p>{props.data}</p>
        <Button
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            props.handleDelete(props.data);
          }}
        />
      </Stack>
    </Tag>
  );
};

const TagInput = () => {
  const [tags, SetTags] = useState<Array<string>>(['miku', 'one']);
  const [tagValue, SetTagValue] = useState<string>('');

  const handleDelete = (value: any) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    SetTags([...tags, tagValue]);
    SetTagValue('');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleOnSubmit}>
        <Input value={tagValue} onChange={(event) => SetTagValue(event.target.value)} />
        <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
          {tags.map((data, index) => {
            return <Tags data={data} handleDelete={handleDelete} key={index} />;
          })}
        </Box>
      </form>
    </Box>
  );
};

export default TagInput;
