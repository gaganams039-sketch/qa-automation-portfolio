# TodoMVC main user flows plan

## Application Overview

The TodoMVC demo app is a small task-list experience where users create, complete, edit, filter, and remove todos. The plan focuses on the main user flows that define whether the app behaves correctly for everyday use.

## Test Scenarios

### 1. Todo creation and editing

**Seed:** `tests/seed.spec.ts`

#### 1.1. should add todos from the input

**File:** `tests/todomvc/should-add-todos.spec.ts`

**Steps:**
  1. Open the TodoMVC app and focus the 'What needs to be done?' input
    - expect: The input is visible and ready for typing
  2. Type 'Buy milk' and press Enter
    - expect: A new todo labeled 'Buy milk' appears in the list
    - expect: The item counter shows 1 item left
  3. Add 'Write tests' and 'Walk the dog'
    - expect: Both todos appear in the list
    - expect: The item counter shows 3 items left

#### 1.2. should edit and delete a todo

**File:** `tests/todomvc/should-edit-and-delete-todo.spec.ts`

**Steps:**
  1. Create a todo named 'Study Playwright'
    - expect: The todo appears in the list
  2. Double-click the todo text to enter edit mode
    - expect: The todo becomes editable
  3. Change the label to 'Study Playwright basics' and confirm
    - expect: The updated label is shown in the list
  4. Click the destroy control for that todo
    - expect: The todo is removed from the list
    - expect: The item counter updates accordingly

### 2. Completion and bulk actions

**Seed:** `tests/seed.spec.ts`

#### 2.1. should mark todos complete and clear completed

**File:** `tests/todomvc/should-complete-and-clear.spec.ts`

**Steps:**
  1. Create multiple todos
    - expect: All todos are visible in the list
  2. Mark one todo complete using the toggle control
    - expect: That todo is shown as completed
    - expect: The item counter decreases by one
  3. Use the 'Clear completed' action
    - expect: Only the incomplete todos remain visible
    - expect: The completed todo is removed from the list

### 3. Filtering and state visibility

**Seed:** `tests/seed.spec.ts`

#### 3.1. should filter todos by all active and completed views

**File:** `tests/todomvc/should-filter-todos.spec.ts`

**Steps:**
  1. Create a mix of active and completed todos
    - expect: The list shows both states correctly
  2. Click the Active filter
    - expect: Only incomplete todos are shown
  3. Click the Completed filter
    - expect: Only completed todos are shown
  4. Return to All and verify the full list is restored
    - expect: All todos are visible again
