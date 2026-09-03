import React, { useEffect, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  arrow as arrowMiddleware,
  type Placement,
} from "@floating-ui/react-dom";
import { cn } from "@/utils/cn";
import "./Tooltip.css";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: Placement;
  trigger?: "hover" | "click";
};

const Tooltip = React.forwardRef(
  ({ content, children, placement = "bottom", trigger = "hover" }: TooltipProps, ref: any) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

    const { refs, floatingStyles, elements, update, middlewareData } = useFloating({
      placement,
      open: visible,
      middleware: [offsetMiddleware(0), arrowMiddleware({ element: arrowElement, padding: 0 })],
      whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => ({ update, middlewareData, elements, floatingStyles, placement }));

    const handleMouseEnter = () => {
      if (trigger === "hover") setVisible(true);
    };
    const handleMouseLeave = () => {
      if (trigger === "hover") setVisible(false);
    };
    const handleMouseDown = () => {
      if (trigger === "click") setVisible(!visible);
    };

    useEffect(() => {
      if (visible && trigger === "click") {
        const referenceEl = elements.reference as HTMLElement | null;
        const floatingEl = elements.floating as HTMLElement | null;
        const handler = (event: MouseEvent | TouchEvent) => {
          if (
            !referenceEl?.contains(event.target as Node) &&
            !floatingEl?.contains(event.target as Node)
          ) {
            setVisible(false);
          }
        };
        document.addEventListener("touchstart", handler);
        document.addEventListener("mousedown", handler);
        return () => {
          document.removeEventListener("touchstart", handler);
          document.removeEventListener("mousedown", handler);
        };
      }
    }, [visible, trigger, elements.reference, elements.floating]);

    const arrowX = middlewareData.arrow?.x ?? 0;
    const arrowY = middlewareData.arrow?.y ?? 0;

    return (
      <>
        <span
          ref={refs.setReference}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          className={cn("TooltipTarget", { visible })}
        >
          {children}
        </span>
        {visible &&
          ReactDOM.createPortal(
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={cn("Tooltip", {
                Tooltip_visible: visible,
                [`Tooltip_${placement}`]: true,
              })}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                ref={setArrowElement}
                style={{ left: arrowX, top: arrowY }}
                className={cn("TooltipArrow")}
              />
              <div className={cn("TooltipWrapper")}>{content}</div>
            </div>,
            document.body
          )}
      </>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
