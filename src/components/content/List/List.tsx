import * as React from "react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { cn } from "@/utils/cn";
import ListItem from "./ListItem";
import ListOptions from "./ListOptions";
import { ListContextProvider } from "./ListContext";
import type { Item, ListProps, ListItemProps } from "./types";
import "./List.css";

type SortableListItemProps = {
  index: number;
  item: Item;
  items: Array<Item>;
  draggable: boolean;
  itemSize: number;
};

const SortableListItem = ({
  index,
  item,
  items,
  draggable,
}: SortableListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: !draggable,
  });

  const style = React.useMemo<React.CSSProperties>(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  return (
    <ListItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      item={item}
      index={index}
      dragging={isDragging}
      style={style}
    />
  );
};

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      renderItem,
      items,
      selection,
      menu,
      search,
      draggable = false,
      itemSize = 48,
    },
    ref
  ) => {
    const [localItems, setLocalItems] = React.useState<Array<Item>>(items);
    const [dragging, setDragging] = React.useState<boolean>(false);
    const [selectedIds, setSelectedIds] = React.useState<Array<Item["id"]>>(
      selection?.initialSelectedIds || []
    );
    const [keywords, setKeywords] = React.useState<string>("");
    const [currentResultItemIndex, setCurrentResultItemIndex] = React.useState<number>(-1);

    const scrollRef = React.useRef<HTMLDivElement>(null);

    const itemSelected = (item: Item) => selectedIds.includes(item.id);

    React.useEffect(() => {
      setLocalItems(items);
    }, [items]);

    const virtualizer = useVirtualizer({
      count: localItems.length,
      getScrollElement: () => scrollRef.current,
      estimateSize: () => itemSize,
      overscan: 10,
    });

    const handleDragStart = () => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100);
      }
      setDragging(true);
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
      setDragging(false);
      if (over && active.id !== over.id) {
        const oldIndex = localItems.findIndex((item) => item.id === active.id);
        const newIndex = localItems.findIndex((item) => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          setLocalItems((prev) => arrayMove(prev, oldIndex, newIndex));
        }
      }
    };

    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor)
    );

    React.useEffect(() => {
      if (search) {
        if (!keywords) {
          setCurrentResultItemIndex(-1);
        } else {
          setCurrentResultItemIndex(
            items.findIndex((item) => search.searchItem(item, keywords))
          );
        }
      }
    }, [keywords, items, search]);

    const nextResult = () => {
      if (search) {
        const searchResults = items.filter((item) =>
          search.searchItem(item, keywords)
        );
        if (searchResults.length > 1) {
          const nextResultIndex = items.findIndex(
            (item, index) =>
              index > currentResultItemIndex &&
              search.searchItem(item, keywords)
          );
          if (nextResultIndex === -1) {
            setCurrentResultItemIndex(
              items.findIndex((item, index) => search.searchItem(item, keywords))
            );
          } else {
            setCurrentResultItemIndex(nextResultIndex);
          }
        }
      }
    };

    const prevResult = () => {
      if (search) {
        const searchResultIndexes = items.reduce<number[]>(
          (indexes, item, index) => {
            if (search.searchItem(item, keywords)) {
              return [...indexes, index];
            }
            return indexes;
          },
          []
        );
        if (searchResultIndexes.length > 1) {
          const prevResultIndex =
            searchResultIndexes.indexOf(currentResultItemIndex) - 1;
          if (prevResultIndex === -1) {
            setCurrentResultItemIndex(
              searchResultIndexes[searchResultIndexes.length - 1]
            );
          } else {
            setCurrentResultItemIndex(searchResultIndexes[prevResultIndex]);
          }
        }
      }
    };

    React.useEffect(() => {
      if (currentResultItemIndex > -1) {
        virtualizer.scrollToIndex(currentResultItemIndex, { align: "center" });
      }
    }, [currentResultItemIndex, virtualizer]);

    return (
      <ListContextProvider
        value={{
          items,
          menu,
          renderItem,
          search:
            search && {
              ...search,
              keywords,
              onChange: setKeywords,
              next: nextResult,
              prev: prevResult,
              currentResultItemIndex,
            },
          selection:
            selection && {
              ...selection,
              selectedIds,
              setSelectedIds,
              itemSelected,
            },
        }}
      >
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div ref={scrollRef} className={cn("ListContainer", className)}>
              <ListOptions />
              <div className={cn("ListScroll", { List_dragging: dragging })}>
                <ul ref={ref} className={cn("List")} style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
                  {virtualizer.getVirtualItems().map((virtualItem) => {
                    const item = localItems[virtualItem.index];
                    if (!item) return null;
                    return (
                      <div
                        key={item.id}
                        data-index={virtualItem.index}
                        ref={virtualizer.measureElement}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                      >
                        <SortableListItem
                          index={virtualItem.index}
                          item={item}
                          items={localItems}
                          draggable={draggable}
                          itemSize={itemSize}
                        />
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </ListContextProvider>
    );
  }
);

List.displayName = "List";

export default List;