import React, { KeyboardEvent } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import ContentEditable from 'react-contenteditable';
import getCaretCoordinates from '../../utils/getCaretCoordinates';
import setCaretToEnd from '../../utils/setCaretToEnd';
import SelectSlashMenu from '../EditableSlashSelectMenu';
import DragHandleIcon from '../../assets/draggable.svg';
import EditableActionMenu from '../EditableActionMenu';

const CMD_KEY = '/';

type Props = {
  position: number;
  id: string;
  tag: string;
  html: string;
  index: number;
  changeCursor: (block: Block, isDown: boolean) => void;
  updatePage: (block: Block) => void;
  addBlock: (block: Block, prevTag: string) => void;
  deleteBlock: (blockId: string) => void;
};

type States = {
  htmlBackup: string | null;
  html: string;
  tag: string;
  imageUrl: string;
  isHovering: boolean;
  selectMenuIsOpen: boolean;
  selectMenuPosition: {
    x: number | null | undefined;
    y: number | null | undefined;
  };
  actionMenuOpen: boolean;
  actionMenuPosition: {
    x: number | null | undefined;
    y: number | null | undefined;
  };
};

//contenteditable로 인해 Class Component 필수로 사용
class EditableBlock extends React.Component<Props, States> {
  contentEditable: React.RefObject<HTMLElement>;
  fileInput!: HTMLInputElement | null;
  constructor(props: Props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.handleDragHandleClick = this.handleDragHandleClick.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onHovering = this.onHovering.bind(this);
    this.outHovering = this.outHovering.bind(this);
    this.openActionMenu = this.openActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
    this.calculateActionMenuPosition =
      this.calculateActionMenuPosition.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: '',
      tag: 'p',
      imageUrl: '',
      isHovering: false,
      selectMenuIsOpen: false,
      selectMenuPosition: {
        x: null,
        y: null,
      },
      actionMenuOpen: false,
      actionMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  //html 내용 또는 태그를 바꿀 때 변경하도록 제작 useEffect deps에 html과 tag가 담겨있는 상태
  componentDidUpdate(_prevProps: any, prevState: { html: any; tag: any }) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    if (htmlChanged || tagChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  // MD 문법 사용 가능케 하도록 정규 표현식으로 tag 바꾸기
  onChangeHandler(e: { target: { value: string } }) {
    if (/(^# )|(^#&nbsp;)/.test(e.target.value)) {
      this.setState(
        {
          html: e.target.value.replace(/(^# )|(^#&nbsp;)/, ''),
          tag: 'h1',
        },
        () => {
          setCaretToEnd(this.contentEditable.current);
        },
      );
    } else if (/(^## )|(^##&nbsp;)/.test(e.target.value)) {
      this.setState(
        {
          html: e.target.value.replace(/(^## )|(^##&nbsp;)/, ''),
          tag: 'h2',
        },
        () => {
          setCaretToEnd(this.contentEditable.current);
        },
      );
    } else if (/(^### )|(^###&nbsp;)/.test(e.target.value)) {
      this.setState(
        {
          html: e.target.value.replace(/(^### )|(^###&nbsp;)/, ''),
          tag: 'h3',
        },
        () => {
          setCaretToEnd(this.contentEditable.current);
        },
      );
    } else if (/(^- )|(^-&nbsp;)|(^\* )|(^\*&nbsp;)/.test(e.target.value)) {
      this.setState(
        {
          html: e.target.value.replace(
            /(^- )|(^-&nbsp;)|(^\* )|(^\*&nbsp;)/,
            '',
          ),
          tag: 'li',
        },
        () => {
          setCaretToEnd(this.contentEditable.current);
        },
      );
    } else if (/(^``` )|(^```&nbsp;)/.test(e.target.value)) {
      this.setState(
        {
          html: e.target.value.replace(/(^``` )|(^```&nbsp;)/, ''),
          tag: 'code',
        },
        () => {
          setCaretToEnd(this.contentEditable.current);
        },
      );
    } else {
      this.setState({ html: e.target.value });
    }
  }

  onHovering() {
    this.setState({ isHovering: true });
  }

  outHovering() {
    this.setState({ isHovering: false });
  }

  onKeyDownHandler(e: {
    key: string;
    shiftKey: KeyboardEvent['shiftKey'];
    nativeEvent: { isComposing: KeyboardEvent['nativeEvent']['isComposing'] };
    preventDefault: () => void;
  }) {
    if (e.key === CMD_KEY) {
      this.setState({ htmlBackup: this.state.html });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.props.changeCursor(
        {
          id: this.props.id,
          html: this.state.html,
          tag: this.state.tag,
        },
        false,
      );
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.props.changeCursor(
        {
          id: this.props.id,
          html: this.state.html,
          tag: this.state.tag,
        },
        true,
      );
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.nativeEvent.isComposing) {
        return;
      }
      if (!this.state.selectMenuIsOpen) {
        e.preventDefault();
        this.props.addBlock(
          {
            id: this.props.id,
            html: this.state.html,
            tag: this.state.tag,
            imageUrl: this.state.imageUrl,
          },
          this.state.tag,
        );
      }
    }
    if (e.key === 'Backspace' && !this.state.html) {
      e.preventDefault();
      if (this.state.tag === 'li') {
        this.setState({ tag: 'p' }, () => {
          setCaretToEnd(this.contentEditable.current);
        });
        return;
      }
      this.props.deleteBlock(this.props.id);
    } else if (e.key === 'Backspace') {
      //TO-DO 비어있지 않는 block에서도 삭제 가능하게
    }
  }
  onKeyUpHandler(e: { key: string }) {
    if (e.key === CMD_KEY) {
      this.openSelectMenuHandler();
    }
  }

  handleDragHandleClick(e: { target: any }) {
    const dragHandle = e.target;
    this.openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
  }

  openActionMenu(parent: positionParent, trigger: string) {
    const { x, y } = this.calculateActionMenuPosition(parent, trigger);
    this.setState({
      ...this.state,
      actionMenuOpen: true,
      actionMenuPosition: { x: x, y: y },
    });
    setTimeout(() => {
      document.addEventListener('click', this.closeActionMenu, false);
    }, 100);
  }

  closeActionMenu() {
    this.setState({
      actionMenuOpen: false,
      actionMenuPosition: { x: null, y: null },
    });
    document.removeEventListener('click', this.closeActionMenu, false);
  }

  openSelectMenuHandler() {
    const { x, y } = getCaretCoordinates();
    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y },
    });
    document.addEventListener('click', this.closeSelectMenuHandler);
  }

  closeSelectMenuHandler() {
    this.setState({
      htmlBackup: null,
      selectMenuIsOpen: false,
      selectMenuPosition: { x: null, y: null },
    });
    document.removeEventListener('click', this.closeSelectMenuHandler);
  }

  handleImageUpload() {
    if (!this.fileInput?.files) return;
    if (this.fileInput && this.fileInput?.files[0]) {
      const imageFile = this.fileInput.files[0];
      this.setState({
        ...this.state,
        imageUrl: URL.createObjectURL(imageFile),
      });
    }
  }

  // 명령어 없이 html을 refresh 하고 ContentEditable 컴포넌트에 다시 focus() 한다.
  // 커서가 끝으로 설정된 상태에서 태그 선택 메뉴를 닫는다
  tagSelectionHandler(tag: string) {
    if (tag === 'img') {
      this.setState({ ...this.state, tag: tag }, () => {
        this.closeSelectMenuHandler();
        if (this.fileInput) {
          this.fileInput.click();
        }
      });
      this.props.addBlock(
        {
          id: this.props.id,
          html: this.state.html,
          tag: this.state.tag,
          imageUrl: this.state.imageUrl,
        },
        this.state.tag,
      );
      this.handleImageUpload();
    } else {
      this.setState({ tag: tag, html: this.state.htmlBackup! }, () => {
        setCaretToEnd(this.contentEditable.current);
        this.closeSelectMenuHandler();
      });
    }
    if (tag === 'li') {
      console.log(this.state.html);
      this.setState({ html: this.state.html });
    }
  }

  calculateActionMenuPosition(parent: positionParent, initiator: string) {
    switch (initiator) {
      case 'DRAG_HANDLE_CLICK':
        const x =
          parent.offsetLeft - parent.scrollLeft + parent.clientLeft - 90;
        const y = parent.offsetTop - parent.scrollTop + parent.clientTop + 35;
        return { x: x, y: y };
      default:
        return { x: null, y: null };
    }
  }
  render() {
    return (
      <>
        {this.state.actionMenuOpen && (
          <EditableActionMenu
            position={this.state.actionMenuPosition}
            actions={{
              deleteBlock: () => this.props.deleteBlock(this.props.id),
            }}
          />
        )}
        {this.state.selectMenuIsOpen && (
          <SelectSlashMenu
            position={this.state.selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            close={this.closeSelectMenuHandler}
          />
        )}
        <Draggable draggableId={this.props.id} index={this.props.position}>
          {(provided: DraggableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              onMouseLeave={this.outHovering}
              onMouseOver={this.onHovering}
            >
              {this.state.tag !== 'img' ? (
                <ContentEditable
                  style={{
                    outline: 'none',
                    width: '97%',
                    display: 'inline-block',
                    listStyleType: 'disc',
                  }}
                  className="Block"
                  data-position={this.props.position}
                  innerRef={this.contentEditable}
                  html={this.state.html}
                  tagName={this.state.tag}
                  onChange={this.onChangeHandler}
                  onKeyDown={this.onKeyDownHandler}
                  onKeyUp={this.onKeyUpHandler}
                />
              ) : (
                <div
                  data-tag={this.state.tag}
                  style={{ width: '97%', display: 'inline-block' }}
                  //ref={this.contentEditable}
                >
                  <input
                    id={`${this.props.id}_fileInput`}
                    name={this.state.tag}
                    type="file"
                    onChange={this.handleImageUpload}
                    ref={(ref) => (this.fileInput = ref)}
                    hidden
                  />
                  {!this.state.imageUrl && (
                    <label htmlFor={`${this.props.id}_fileInput`}>
                      No Image Selected. Click To Select.
                    </label>
                  )}
                  {this.state.imageUrl && (
                    <img
                      src={this.state.imageUrl}
                      style={{
                        height: 200,
                        display: 'table',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                      alt="img"
                      // alt={/[^\/]+(?=\.[^\/.]*$)/.exec(this.state.imageUrl)[0]}
                    />
                  )}
                </div>
              )}

              <span
                style={{
                  width: '3%',
                  display: 'inline-block',
                }}
                role="button"
                tabIndex={0}
                onClick={this.handleDragHandleClick}
                {...provided.dragHandleProps}
              >
                {this.state.isHovering && (
                  <img src={DragHandleIcon} alt="Drag-Icon" />
                )}
              </span>
            </div>
          )}
        </Draggable>
      </>
    );
  }
}

export default EditableBlock;
