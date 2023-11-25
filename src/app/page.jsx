"use client";

import { Flex } from "@chakra-ui/react";
import PositionsForm from "../components/PositionForm";
import { FormProvider } from "../context/FormContext";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./globals.css";

const Column = dynamic(() => import("../components/Colums"), { ssr: false });

const reorderTasks = (tasks, startIndex, endIndex) => {
  const newTaskList = Array.from(tasks);
  const [removed] = newTaskList.splice(startIndex, 1);
  newTaskList.splice(endIndex, 0, removed);
  return newTaskList;
};

export default function PositionsPage() {
  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const [state, setState] = useState(initialData);
  const [placeholderProps, setPlaceholderProps] = useState({});

  const getDraggedDom = (draggableId) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const { tasks } = state;
    const newTasks = reorderTasks(tasks, source.index, destination.index);

    const newState = {
      ...state,
      tasks: newTasks,
    };
    setState(newState);
  };

  const onDragUpdate = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const draggedDOM = getDraggedDom(draggableId);

    if (!draggedDOM.parentNode) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = destination.index;
    const sourceIndex = source.index;

    const childrenArray = draggedDOM.parentNode.children
      ? [...draggedDOM.parentNode.children]
      : [];

    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.splice(0, destinationIndex),
      movedItem,
      ...childrenArray.splice(destinationIndex + 1),
    ];

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      updatedArray.splice(0, destinationIndex).reduce((total, current) => {
        const style = current.currentStyle || window.getComputedStyle(current);
        const marginBottom = parseFloat(style.marginBottom);
        return total + current.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
    });
  };

  const onDragStart = (result) => {
    const { source, draggableId } = result;
    const draggedDOM = getDraggedDom(draggableId);

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = source.index;

    if (!draggedDOM.parentNode) return;

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, current) => {
          const style =
            current.currentStyle || window.getComputedStyle(current);
          const marginBottom = parseFloat(style.marginBottom);

          return total + current.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
    });
  };

  return (
    <main className="flex flex-row w-full h-full pb-8 justify-center">
      <div className="flex flex-col w-1/3 h-8/12 my-3 ml-3 mr-1 justify-between">
        <div className="h-11/12 w-full overflow-y-scroll">
          <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <Flex
              flexDir="column"
              bg="main-bg"
              // minH="100vh"
              w="full"
              color="white-text"
              pb="2rem"
            >
              <Column placeholderProps={placeholderProps} tasks={state.tasks} />
            </Flex>
          </DragDropContext>
        </div>
        <button
          type="button"
          className="button text-white py-2 px-4 my-2 mb-6 rounded-md"
        >
          Создать новую должность
        </button>
      </div>
      <div className="flex flex-col w-2/3 h-8/12 mt-3 mr-3 mb-5 ml-1 p-2 bg-light-grey rounded">
        <FormProvider>
          <PositionsForm />
        </FormProvider>
      </div>
    </main>
  );
}

const initialData = {
  tasks: [
    { id: 1, content: "Новобранец", salary: "$50", level: "10 заданий" },
    { id: 2, content: "Рядовой", salary: "$80", level: "5 заданий" },
    { id: 3, content: "Сержант", salary: "$100", level: "12 заданий" },
    { id: 4, content: "Рядовой", salary: "$80", level: "20 заданий" },
    { id: 5, content: "Новобранец", salary: "$50", level: "15 заданий" },
    { id: 6, content: "Рядовой", salary: "$80", level: "20 заданий" },
    { id: 7, content: "Новобранец", salary: "$50", level: "15 заданий" },
  ],
};
