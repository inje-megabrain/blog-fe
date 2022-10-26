type Block = {
  id: React.SetStateAction<any>;
  tag: string;
  html: any;
  imageUrl?: string;
};

type positionParent = {
  offsetLeft: number;
  scrollLeft: number;
  clientLeft: number;
  offsetTop: number;
  scrollTop: number;
  clientTop: number;
};
