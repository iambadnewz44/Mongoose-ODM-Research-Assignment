# React Interactive Todo List

A simple React project demonstrating components, state management, state changes, and props.

## Features
- Add todo items
- List todo items
- Mark tasks complete/incomplete
- Delete todo items
- Reusable React components
- Responsive interface

## Component structure
- `App` owns the todo state.
- `TodoForm` owns the input field state and receives `onAddTodo` as a prop.
- `TodoList` receives the todo array and callback props.
- `TodoItem` receives one todo and callback props.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Build for production

```bash
npm run build
```
