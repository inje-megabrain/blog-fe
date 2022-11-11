import React from 'react';
import autobind from 'autobind-decorator';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import setCaretToEnd from '../../utils/setCaretToEnd';
import DragHandleIcon from '../../assets/draggable.svg';
import { Props, States } from './types';
import EditableActionMenu from '../EditableActionMenu';

//contenteditable로 인해 Class Component 필수로 사용
class DraggableBlock extends React.Component<Props, States> {
  contentEditable: React.RefObject<HTMLElement>;

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
    this.state = Object.create(DraggableBlock.DEFAULT_STATE);
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

  @autobind
  onHovering() {
    this.setState({ isHovering: true });
  }

  @autobind
  outHovering() {
    this.setState({ isHovering: false });
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

  renderContent(): JSX.Element | undefined {
    return <></>;
  }

  renderMenu(): JSX.Element | undefined {
    return <></>;
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
        {this.renderMenu()}
        <Draggable draggableId={this.props.id} index={this.props.position}>
          {(provided: DraggableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              onMouseLeave={this.outHovering}
              onMouseOver={this.onHovering}
            >
              {this.renderContent()}

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

export default DraggableBlock;
