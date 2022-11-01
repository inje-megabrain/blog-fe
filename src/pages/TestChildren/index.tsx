import { Button } from '@mui/material';
import { useState } from 'react';
import TagSelectorModal from '../../components/TagSelectorModal';

const TestChildrenPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <TagSelectorModal open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default TestChildrenPage;
