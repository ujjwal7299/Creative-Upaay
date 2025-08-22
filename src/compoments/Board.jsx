import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { moveTask } from "../redux/taskSlice";
import Column from "./Column";

export default function Board() {
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks);
  const filters = useSelector((s) => s.ui.filters);
  // 0 or 1
  const filterFn = (task) => {
    const q = filters.query.trim().toLowerCase();
    const okQuery = !q || task.name.toLowerCase().includes(q) || task.desc.toLowerCase().includes(q);
    const okPriority = !filters.priority || task.priority === filters.priority;
    const okCategory = !filters.category || task.category.toLowerCase().includes(filters.category.toLowerCase());
    return okQuery && okPriority && okCategory;
  };
//Uses useMemo so filtering only runs when tasks or filters change
  const filtered = useMemo(() => ({
    todo: tasks.todo.filter(filterFn),
    inProgress: tasks.inProgress.filter(filterFn),
    done: tasks.done.filter(filterFn),
  }), [tasks, filters]);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch(
      moveTask({
        from: source.droppableId,
        to: destination.droppableId,
        taskId: draggableId,
        destIndex: destination.index,
      })
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Column title="To Do" status="todo" tasks={filtered.todo} />
        <Column title="In Progress" status="inProgress" tasks={filtered.inProgress} />
        <Column title="Done" status="done" tasks={filtered.done} />
      </div>
    </DragDropContext>
  );
}
