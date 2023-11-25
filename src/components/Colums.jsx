import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import "../app/globals.css";

const Column = ({ roles, placeholderProps }) => {
  return (
    <Droppable droppableId="col">
      {(droppableProvided) => (
        <Flex
          flex={1}
          flexDir="column"
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          {roles.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id.toString()}
              index={index}
            >
              {(draggableProvided, draggableSnapshot) => (
                <Flex
                  className="flex text-white bg-light-grey rounded"
                  mb="4px"
                  h="45px"
                  rounded="3px"
                  p="1.5rem"
                  _active={{ bg: "#23792F" }}
                  outline="2px solid"
                  outlineColor={
                    draggableSnapshot.isDragging ? "card-border" : "transparent"
                  }
                  boxShadow={
                    draggableSnapshot.isDragging
                      ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                      : "unset"
                  }
                  align="center"
                  zIndex={1}
                  {...draggableProvided.dragHandleProps}
                  {...draggableProvided.draggableProps}
                  ref={draggableProvided.innerRef}
                >
                  <div className="flex flex-row w-full justify-between">
                    <Text className="flex flex-col my-3">
                      <p className="text-gray-200 text-larger mb-1">
                        {task.name}
                      </p>
                      <p className="text-gray-600 text-sm/2">{task.level}</p>
                    </Text>
                    <Text className="flex flex-row my-3">
                      <p className="text-yellow-500 font-bold">{task.salary}</p>
                      <p className="text-gray-500">/час</p>
                    </Text>
                  </div>
                </Flex>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </Flex>
      )}
    </Droppable>
  );
};

export default Column;
