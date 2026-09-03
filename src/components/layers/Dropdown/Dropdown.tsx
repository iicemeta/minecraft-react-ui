import React from "react";
import ReactDOM from "react-dom";
import { useFloating, autoUpdate, type Placement } from "@floating-ui/react-dom";
import { cn } from "@/utils/cn";
import "./Dropdown.css";

export type DropdownTargetProps = {
  open: () => void;
  close: () => void;
  visible: boolean;
  ref: React.LegacyRef<HTMLDivElement> | undefined;
  className: string;
};

export type TargetFunction = (targetProps: DropdownTargetProps) => React.ReactNode;

export type Target =
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | TargetFunction;

export type DropdownProps = {
  content: React.ReactNode;
  target: Target;
  closeOnClickContent?: boolean;
  closeOnClickOutside?: boolean;
  placement?: Placement;
  trigger?: "click" | "hover";
};

const Dropdown = ({
  content,
  target,
  placement = "bottom-start",
  closeOnClickContent,
  closeOnClickOutside,
  trigger = "click",
}: DropdownProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const { refs, floatingStyles, elements } = useFloating({
    placement,
    open: visible,
    whileElementsMounted: autoUpdate,
  });

  const handleMouseDown = () => {
    setVisible(!visible);
  };

  const handleMouseEnter = () => {
    if (trigger === "hover" && !visible) {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover" && visible) {
      setVisible(false);
    }
  };

  const referenceEl = elements.reference as HTMLElement | null;
  const floatingEl = elements.floating as HTMLElement | null;

  const handleClickOnContent = () => {
    if (closeOnClickContent) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    if (visible && trigger === "click") {
      const handler: EventListener = (event) => {
        if (
          closeOnClickOutside &&
          referenceEl &&
          floatingEl &&
          !referenceEl.contains(event.target as Node) &&
          !floatingEl.contains(event.target as Node)
        ) {
          setVisible(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  }, [visible, referenceEl, floatingEl]);

  React.useEffect(() => {
    if (visible && trigger === "hover") {
      const handler: EventListener = (event) => {
        if (
          referenceEl &&
          floatingEl &&
          !referenceEl.contains(event.target as Node) &&
          !floatingEl.contains(event.target as Node)
        ) {
          setVisible(false);
        }
      };
      document.addEventListener("mouseleave", handler);
      return () => document.removeEventListener("mouseleave", handler);
    }
  }, [visible, referenceEl, floatingEl]);

  const minWidth = referenceEl ? `${referenceEl.offsetWidth}px` : undefined;

  return (
    <>
      {typeof target === "function"
        ? target({
            ref: refs.setReference,
            open: () => setVisible(true),
            close: () => setVisible(false),
            visible,
            className: cn("DropdownTarget", {
              DropdownTarget_visible: visible,
            }),
          })
        : React.cloneElement(target, {
            ref: refs.setReference,
            onClick: handleMouseDown,
            onMouseEnter: handleMouseEnter,
            onMouseMove: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            active: visible,
            className: cn("DropdownTarget", target.props.className, {
              DropdownTarget_visible: visible,
            }),
          })}
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, minWidth }}
            className={cn("Dropdown", { Dropdown_visible: visible })}
            onClick={handleClickOnContent}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Dropdown;
