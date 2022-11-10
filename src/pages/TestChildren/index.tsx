import { Button } from '@mui/material';
import { useState } from 'react';
import TagSelectorModal from '../../components/TagSelectorModal';
import useModal from '../../hooks/useModal';

const TestChildrenPage = () => {
  const { isOpen, toggle } = useModal();
  const [selectTagData, setSelectTagData] = useState<string[] | undefined>([]);

  return (
    <div>
      <Button onClick={toggle}>Open modal</Button>
      <TagSelectorModal
        open={isOpen}
        handleOpen={toggle}
        selectTagData={selectTagData!}
        setSelectTagData={setSelectTagData}
      />
    </div>
  );
};

export default TestChildrenPage;
