import { Button } from '@mui/material';
import { useState } from 'react';
import TagSelectorModal from '../../components/TagSelectorModal';

const TestChildrenPage = () => {
  const [selectTagData, setSelectTagData] = useState<string[] | undefined>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <TagSelectorModal
        open={open}
        handleOpen={handleOpen}
        selectTagData={selectTagData!}
        setSelectTagData={setSelectTagData}
      />
    </div>
  );
};

export default TestChildrenPage;
