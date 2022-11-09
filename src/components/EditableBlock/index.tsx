import React, { KeyboardEvent } from 'react';
import autobind from 'autobind-decorator';
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
  onFocusBlock: (block: Block) => void;
  captured: boolean;
  changeCursor: (block: Block, isDown: boolean) => void;
  updatePage: (block: Block) => void;
  addBlock: (block: Block, prevTag: string) => void;
  deleteBlock: (block: Block) => void;
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

  static readonly styleOnCaptured = {
    backgroundColor: '#b3d4fc',
  };

  static readonly DEFAULT_STATE = {
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
  constructor(props: Props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = Object.create(EditableBlock.DEFAULT_STATE);
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  //html 내용 또는 태그를 바꿀 때 변경하도록 제작 useEffect deps에 html과 tag가 담겨있는 상태
  componentDidUpdate(prevProps: any, prevState: { html: string; tag: string }) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    const leftBarTagChanged = prevProps.tag !== this.props.tag;
    if (leftBarTagChanged) {
      this.setState({ tag: this.props.tag });
      setCaretToEnd(this.contentEditable.current);
    }
    if (htmlChanged || tagChanged) {
      if (tagChanged && this.state.tag === prevProps.tag) {
        setCaretToEnd(this.contentEditable.current);
        return;
      }
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
        captured: this.props.captured,
      });
    }
  }

  // MD 문법 사용 가능케 하도록 정규 표현식으로 tag 바꾸기
  @autobind
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

  @autobind
  onHovering() {
    this.setState({ isHovering: true });
  }

  @autobind
  outHovering() {
    this.setState({ isHovering: false });
  }

  @autobind
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
          captured: this.props.captured,
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
          captured: this.props.captured,
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
            captured: this.props.captured,
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
      this.props.deleteBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        captured: this.props.captured,
      });
    } else if (e.key === 'Backspace') {
      //TO-DO 비어있지 않는 block에서도 삭제 가능하게
    }
  }

  @autobind
  onKeyUpHandler(e: { key: string }) {
    if (e.key === CMD_KEY) {
      this.openSelectMenuHandler();
    }
  }

  @autobind
  onFocusHandler() {
    this.props.onFocusBlock({
      id: this.props.id,
      html: this.state.html,
      tag: this.state.tag,
      captured: this.props.captured,
    });
  }

  @autobind
  handleDragHandleClick(e: { target: any }) {
    const dragHandle = e.target;
    this.openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
  }

  @autobind
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

  @autobind
  closeActionMenu() {
    this.setState({
      actionMenuOpen: false,
      actionMenuPosition: { x: null, y: null },
    });
    document.removeEventListener('click', this.closeActionMenu, false);
  }

  @autobind
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

  @autobind
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
  @autobind
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
          captured: this.props.captured,
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
      this.setState({ html: this.state.html });
    }
  }

  @autobind
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
              deleteBlock: () =>
                this.props.deleteBlock({
                  id: this.props.id,
                  html: this.state.html,
                  tag: this.state.tag,
                  captured: this.props.captured,
                }),
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
        <div
          style={
            this.props.captured ? EditableBlock.styleOnCaptured : undefined
          }
        >
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
                    onFocus={this.onFocusHandler}
                  />
                ) : (
                  <div
                    data-tag={this.state.tag}
                    style={{ width: '97%', display: 'inline-block' }}
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
        </div>
      </>
    );
  }
}

export default EditableBlock;
