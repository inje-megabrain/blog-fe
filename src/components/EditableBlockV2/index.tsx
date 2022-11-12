import autobind from 'autobind-decorator';
import ContentEditable from 'react-contenteditable';
import getCaretCoordinates from '../../utils/getCaretCoordinates';
import setCaretToEnd from '../../utils/setCaretToEnd';
import SelectSlashMenu from '../EditableSlashSelectMenu';
import {
  BlockChangeEvent,
  BlockKeyDownEvent,
  BlockKeyDownHandler,
  Props,
} from './types';
import TagSupporter from './tagSupporter';
import DraggableBlock from './draggableBlock';

const CMD_KEY = '/';

//contenteditable로 인해 Class Component 필수로 사용
class EditableBlock extends DraggableBlock {
  fileInput!: HTMLInputElement | null;

  constructor(props: Props) {
    super(props, {
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
    });
  }

  onHandlers = {
    onChange: (e: BlockChangeEvent) => {
      let result;
      if ((result = TagSupporter.support(e.target.value))) {
        this.setState(
          {
            tag: result[0],
            html: result[1],
          },
          () => setCaretToEnd(this.contentEditable.current),
        );
      } else {
        this.setState({ html: e.target.value });
      }
    },
    onKeyDown: (e: BlockKeyDownEvent) => {
      if (Object.hasOwn(this.keyDownHandler, e.key)) {
        this.keyDownHandler[e.key](e);
      }
    },
    onKeyUp: (e: { key: string }) => {
      if (e.key === CMD_KEY) {
        this.openSelectMenuHandler();
      }
    },
    onFocus: () => {
      this.props.onFocusBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        captured: this.props.captured,
      });
    },
  };

  keyDownHandler: BlockKeyDownHandler = {
    [CMD_KEY]: (e) => {
      this.setState({ htmlBackup: this.state.html });
    },
    ArrayUp: (e) => {
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
    },
    ArrayDown: (e) => {
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
    },
    Enter: (e) => {
      if (!e.shiftKey) {
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
    },
    Backspace: (e) => {
      if (!this.state.html) {
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
      }
    },
  };

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

  renderMenu() {
    if (this.state.selectMenuIsOpen)
      return (
        <SelectSlashMenu
          position={this.state.selectMenuPosition}
          onSelect={this.tagSelectionHandler}
          close={this.closeSelectMenuHandler}
        />
      );
  }

  renderContent() {
    return (
      <>
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
            {...this.onHandlers}
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
      </>
    );
  }
}

export default EditableBlock;
